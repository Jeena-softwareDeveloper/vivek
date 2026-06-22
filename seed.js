const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data...');

  // 1. Create Admin User
  const existingAdmin = await prisma.admin_users.findUnique({
    where: { email: 'admin@vivekvijay.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.admin_users.create({
      data: {
        name: 'Super Admin',
        email: 'admin@vivekvijay.com',
        password: hashedPassword,
        role: 'superadmin',
      },
    });
    console.log('✅ Created Admin User: admin@vivekvijay.com / password123');
  } else {
    console.log('Admin user already exists.');
  }

  // 2. Create Global Settings
  const settingsCount = await prisma.settings.count();
  if (settingsCount === 0) {
    await prisma.settings.create({
      data: {
        companyName: 'VIVEK VIJAY AND COMPANY',
        email: 'info@vivekvijay.com',
        phone: '+1 (555) 123-4567',
        address: '123 Construction Blvd, New York, NY 10001',
        seoTitle: 'VIVEK VIJAY AND COMPANY | Engineering Contractors',
        seoDesc: 'Leading the industry in commercial and residential construction.',
      },
    });
    console.log('✅ Created Global Settings');
  }

  // 3. Initial Services
  const servicesCount = await prisma.services.count();
  if (servicesCount === 0) {
    await prisma.services.createMany({
      data: [
        {
          title: 'Commercial Construction',
          slug: 'commercial-construction',
          description: 'We deliver comprehensive commercial construction solutions, from office buildings and retail spaces to large-scale industrial facilities. Our team ensures that your project is completed on time, within budget, and to the highest standards of quality and safety.',
          shortDesc: 'Full-scale commercial builds and renovations.',
          icon: 'Building2',
          order: 1,
        },
        {
          title: 'Residential Development',
          slug: 'residential-development',
          description: 'Transforming blueprints into beautiful homes. Whether it is a custom-built mansion or a multi-family residential complex, we bring unparalleled craftsmanship and attention to detail to every residential project.',
          shortDesc: 'Custom homes and multi-family complexes.',
          icon: 'Home',
          order: 2,
        },
        {
          title: 'Renovation & Remodeling',
          slug: 'renovation-remodeling',
          description: 'Breathe new life into existing structures with our expert renovation services. We handle everything from structural updates to modern interior finishes, ensuring seamless integration with the original building.',
          shortDesc: 'Modernizing and restoring existing structures.',
          icon: 'Hammer',
          order: 3,
        },
      ],
    });
    console.log('✅ Created Default Services');
  }

  // 4. Site Content Blocks
  const contentCount = await prisma.site_content.count();
  if (contentCount === 0) {
    await prisma.site_content.createMany({
      data: [
        { page: 'home', section: 'hero', key: 'headline', value: 'Building Your Dreams Into Reality' },
        { page: 'home', section: 'hero', key: 'subtext', value: 'Over 20 years of excellence in commercial and residential construction. We deliver quality that lasts.' },
        { page: 'home', section: 'stats', key: 'years', value: '25+' },
        { page: 'home', section: 'stats', key: 'projects', value: '500+' },
      ],
    });
    console.log('✅ Created Site Content Blocks');
  }

  console.log('🎉 Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
