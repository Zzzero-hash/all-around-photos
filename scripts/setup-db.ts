#!/usr/bin/env tsx

/**
 * Database setup script for All Around Photos LLC
 * This script helps create the PostgreSQL database and user
 */

import { execSync } from 'child_process';

const DB_NAME = 'photography_db';
const DB_USER = 'postgres';
const DB_PASSWORD = 'yourpassword'; // Change this to your actual password

console.log('🚀 Setting up PostgreSQL database for All Around Photos LLC...\n');

try {
  // Test PostgreSQL connection
  console.log('1. Testing PostgreSQL connection...');
  execSync(`psql -U ${DB_USER} -h localhost -c "SELECT version();"`, {
    stdio: 'inherit',
    env: { ...process.env, PGPASSWORD: DB_PASSWORD }
  });
  
  console.log('✅ PostgreSQL connection successful!\n');

  // Create database if it doesn't exist
  console.log('2. Creating database...');
  try {
    execSync(`createdb -U ${DB_USER} -h localhost ${DB_NAME}`, {
      stdio: 'inherit',
      env: { ...process.env, PGPASSWORD: DB_PASSWORD }
    });
    console.log(`✅ Database '${DB_NAME}' created successfully!\n`);
  } catch (error) {
    console.log(`ℹ️  Database '${DB_NAME}' might already exist, continuing...\n`);
  }

  // Test database connection
  console.log('3. Testing database connection...');
  execSync(`psql -U ${DB_USER} -h localhost -d ${DB_NAME} -c "SELECT current_database();"`, {
    stdio: 'inherit',
    env: { ...process.env, PGPASSWORD: DB_PASSWORD }
  });
  
  console.log('✅ Database connection successful!\n');
  console.log('🎉 Database setup complete! You can now run:');
  console.log('   npm run db:push    # Push schema to database');
  console.log('   npm run db:seed    # Seed with initial data');
  console.log('   npm run db:studio  # Open Prisma Studio');

} catch (error) {
  console.error('❌ Database setup failed:', error);
  console.log('\n📋 Manual setup instructions:');
  console.log('1. Make sure PostgreSQL is installed and running');
  console.log('2. Update the password in your .env file');
  console.log('3. Create database manually: createdb photography_db');
  console.log('4. Run: npm run db:push');
}