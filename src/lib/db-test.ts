import { prisma } from './prisma';

export async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function checkDatabaseTables() {
  try {
    // Test if we can query the database
    const userCount = await prisma.user.count();
    const photoCount = await prisma.photo.count();
    const serviceCount = await prisma.service.count();
    
    console.log('📊 Database table counts:');
    console.log(`  Users: ${userCount}`);
    console.log(`  Photos: ${photoCount}`);
    console.log(`  Services: ${serviceCount}`);
    
    return { userCount, photoCount, serviceCount };
  } catch (error) {
    console.error('❌ Error checking database tables:', error);
    throw error;
  }
}