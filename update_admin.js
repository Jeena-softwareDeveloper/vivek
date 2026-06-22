const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // You can change these to whatever you prefer!
  const newEmail = 'admin@vivekvijayandcompany.com';
  const newPassword = 'AdminPassword123!';
  
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  console.log('Creating/Updating admin user...');
  
  // Upsert will create the user if they don't exist, or update their password if they do
  const admin = await prisma.admin_users.upsert({
    where: { email: newEmail },
    update: {
      password: hashedPassword,
      name: 'Vivek Vijay Admin'
    },
    create: {
      name: 'Vivek Vijay Admin',
      email: newEmail,
      password: hashedPassword,
      role: 'superadmin'
    }
  });

  console.log('✅ Success! The new admin credentials have been pushed to the database:');
  console.log('-------------------------------------------');
  console.log(`Email:    ${newEmail}`);
  console.log(`Password: ${newPassword}`);
  console.log('-------------------------------------------');
}

main()
  .catch((e) => {
    console.error('Error updating admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
