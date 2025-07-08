// Test script to reproduce order creation error
const testOrderCreation = async () => {
  const orderData = {
    items: [
      {
        productId: '675a8a69a82b5c6b8a7c1b8e', // Sample product ID
        quantity: 1,
      },
    ],
    customerInfo: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      address: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        pinCode: '123456',
      },
      updateProfile: false,
    },
    notes: 'Test order',
  };

  try {
    const response = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    console.log('Status Code:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.log('ERROR DETAILS:', data);
    }
  } catch (error) {
    console.error('Network/Parse Error:', error.message);
  }
};

testOrderCreation();
