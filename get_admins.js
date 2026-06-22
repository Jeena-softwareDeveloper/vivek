const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.admin_users.findMany();
  console.log("Admin Users in DB:");
  users.forEach(u => console.log(u.email));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
