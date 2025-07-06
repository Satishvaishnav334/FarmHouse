import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    let orders;
    if ((session.user as any).role === 'admin') {
      // Admin can see all orders
      if (userId) {
        orders = await Order.find({ userId }).populate('userId', 'name email phone').sort({ createdAt: -1 });
      } else {
        orders = await Order.find({}).populate('userId', 'name email phone').sort({ createdAt: -1 });
      }
    } else {
      // Users can only see their own orders
      orders = await Order.find({ userId: (session.user as any).id }).sort({ createdAt: -1 });
    }
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const { items, customerInfo } = body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Order items are required' },
        { status: 400 }
      );
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      );
    }

    const { street, city, state, pinCode } = customerInfo.address;
    if (!street || !city || !state || !pinCode) {
      return NextResponse.json(
        { error: 'Complete address is required' },
        { status: 400 }
      );
    }

    // Validate pin code format
    if (!/^\d{6}$/.test(pinCode)) {
      return NextResponse.json(
        { error: 'Pin code must be 6 digits' },
        { status: 400 }
      );
    }

    // Validate and calculate order totals
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found` },
          { status: 400 }
        );
      }

      if (!product.inStock) {
        return NextResponse.json(
          { error: `Product ${product.name} is out of stock` },
          { status: 400 }
        );
      }

      const quantity = parseInt(item.quantity);
      if (quantity < 1) {
        return NextResponse.json(
          { error: 'Quantity must be at least 1' },
          { status: 400 }
        );
      }

      const itemTotal = product.price * quantity;
      totalAmount += itemTotal;

      validatedItems.push({
        productId: product._id,
        productName: product.name,
        productPrice: product.price,
        quantity: quantity,
        totalPrice: itemTotal,
      });
    }

    // Calculate final amount (with delivery fee if needed)
    const deliveryFee = totalAmount < 500 ? 50 : 0; // Free delivery for orders above ₹500
    const finalAmount = totalAmount + deliveryFee;

    // Create new order
    const newOrder = new Order({
      userId: (session.user as any).id,
      items: validatedItems,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: {
          street: customerInfo.address.street,
          city: customerInfo.address.city,
          state: customerInfo.address.state,
          pinCode: customerInfo.address.pinCode,
        },
      },
      paymentMethod: 'cod', // Only COD supported
      totalAmount,
      deliveryFee,
      finalAmount,
      notes: body.notes || '',
    });

    const savedOrder = await newOrder.save();
    
    // Update user's address if provided
    if (customerInfo.updateProfile) {
      await User.findByIdAndUpdate(
        (session.user as any).id,
        {
          name: customerInfo.name,
          address: {
            street: customerInfo.address.street,
            city: customerInfo.address.city,
            state: customerInfo.address.state,
            pinCode: customerInfo.address.pinCode,
          },
          updatedAt: new Date(),
        }
      );
    }
    
    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    const { orderId, orderStatus } = body;
    
    if (!orderId || !orderStatus) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(orderStatus)) {
      return NextResponse.json(
        { error: 'Invalid order status' },
        { status: 400 }
      );
    }

    const updateData: any = { orderStatus, updatedAt: new Date() };
    
    // Set delivered date if status is delivered
    if (orderStatus === 'delivered') {
      updateData.deliveredAt = new Date();
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
