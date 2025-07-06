const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://SawariyaNovelty:Vikram334@sawariyanovelty.631oh8e.mongodb.net/?retryWrites=true&w=majority&appName=SawariyaNovelty";

async function migrateUsers() {
  try {
    await mongoose.connect(MONGODB_URI, {
      ssl: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');

    // Update admin user
    const adminResult = await mongoose.connection.db.collection('users').updateOne(
      { email: 'admin@sawariya.com' },
      {
        $set: {
          phone: '1234567890',
          phoneVerified: true
        }
      }
    );
    console.log('Admin user updated:', adminResult.modifiedCount);

    // Update regular user
    const userResult = await mongoose.connection.db.collection('users').updateOne(
      { email: 'user@sawariya.com' },
      {
        $set: {
          phone: '9876543210',
          phoneVerified: true
        }
      }
    );
    console.log('Regular user updated:', userResult.modifiedCount);

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrateUsers();
