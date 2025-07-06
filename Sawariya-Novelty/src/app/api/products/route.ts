import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// Fallback products for initial seeding
const fallbackProducts = [
  {
    id: 1,
    name: "Luxury Lipstick Collection",
    price: 299,
    originalPrice: 399,
    description: "Premium lipstick collection with long-lasting formula",
    category: "cosmetics",
    image: "/api/placeholder/300/300",
    rating: 4.8,
    badge: "Bestseller",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Glitter Nail Art Set",
    price: 199,
    originalPrice: 249,
    description: "Complete nail art set with glitter and accessories",
    category: "novelty",
    image: "/api/placeholder/300/300",
    rating: 4.6,
    badge: "New",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Face Serum Premium",
    price: 599,
    originalPrice: 799,
    description: "Anti-aging face serum with natural ingredients",
    category: "cosmetics",
    image: "/api/placeholder/300/300",
    rating: 4.9,
    badge: "Sale",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "LED Makeup Mirror",
    price: 899,
    originalPrice: 1199,
    description: "Professional LED makeup mirror with adjustable lighting",
    category: "novelty",
    image: "/api/placeholder/300/300",
    rating: 4.7,
    badge: "Hot",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    // If no products exist, seed with fallback data
    if (products.length === 0) {
      const seededProducts = await Product.insertMany(fallbackProducts.map(p => ({
        ...p,
        _id: undefined, // Let MongoDB generate IDs
      })));
      return NextResponse.json(seededProducts);
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, category' },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      name: body.name,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : parseFloat(body.price),
      description: body.description || '',
      category: body.category,
      image: body.image || '/api/placeholder/300/300',
      rating: body.rating || 0,
      badge: body.badge || '',
      inStock: body.inStock !== undefined ? body.inStock : true,
      stock: body.stock || 0,
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    if (!body.id && !body._id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const productId = body.id || body._id;
    
    const updateData: {
      name?: string;
      description?: string;
      category?: string;
      badge?: string;
      inStock?: boolean;
      stock?: number;
      price?: number;
      originalPrice?: number;
      rating?: number;
    } = {
      name: body.name,
      description: body.description,
      category: body.category,
      badge: body.badge,
      inStock: body.inStock,
      stock: body.stock,
    };

    if (body.price) updateData.price = parseFloat(body.price);
    if (body.originalPrice) updateData.originalPrice = parseFloat(body.originalPrice);
    if (body.rating !== undefined) updateData.rating = parseFloat(body.rating);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
