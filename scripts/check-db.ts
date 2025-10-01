import { prisma } from '../src/lib/prisma';

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Check if tables exist by trying to count records
    try {
      const userCount = await prisma.user.count();
      console.log(`👥 Users: ${userCount}`);
    } catch (error) {
      console.log('❌ Users table not accessible');
    }

    try {
      const photoCount = await prisma.photo.count();
      console.log(`📸 Photos: ${photoCount}`);
    } catch (error) {
      console.log('❌ Photos table not accessible');
    }

    try {
      const serviceCount = await prisma.service.count();
      console.log(`🛠️  Services: ${serviceCount}`);
    } catch (error) {
      console.log('❌ Services table not accessible');
    }

    try {
      const galleryCount = await prisma.clientGallery.count();
      console.log(`🖼️  Client Galleries: ${galleryCount}`);
    } catch (error) {
      console.log('❌ Client Galleries table not accessible');
    }

    try {
      const orderCount = await prisma.order.count();
      console.log(`🛒 Orders: ${orderCount}`);
    } catch (error) {
      console.log('❌ Orders table not accessible');
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();