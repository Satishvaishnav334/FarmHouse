const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://SawariyaNovelty:Vikram334@sawariyanovelty.631oh8e.mongodb.net/?retryWrites=true&w=majority&appName=SawariyaNovelty";

async function migrateProductImages() {
  try {
    await mongoose.connect(MONGODB_URI, {
      ssl: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');

    // Get all products that have an image field but no images array
    const products = await mongoose.connection.db.collection('products').find({
      image: { $exists: true },
      images: { $exists: false }
    }).toArray();

    console.log(`Found ${products.length} products to migrate`);

    if (products.length === 0) {
      console.log('No products need migration');
      process.exit(0);
    }

    // Update each product to add images array with existing image value
    let migratedCount = 0;
    for (const product of products) {
      const imageValue = product.image || '/api/placeholder/300/300';
      
      const result = await mongoose.connection.db.collection('products').updateOne(
        { _id: product._id },
        {
          $set: {
            images: [imageValue]
          }
        }
      );

      if (result.modifiedCount > 0) {
        migratedCount++;
        console.log(`Migrated product: ${product.name || product._id} - ${imageValue}`);
      }
    }

    console.log(`Migration completed successfully! Migrated ${migratedCount} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrateProductImages();
