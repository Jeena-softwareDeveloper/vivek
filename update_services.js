const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old services...');
  await prisma.services.deleteMany({});

  const services = [
    { title: 'Hospitals', shortDesc: 'State-of-the-art healthcare facilities.', icon: 'Activity' },
    { title: 'Commercial', shortDesc: 'Modern commercial spaces and offices.', icon: 'Briefcase' },
    { title: 'Industrial', shortDesc: 'Large-scale industrial and manufacturing setups.', icon: 'Factory' },
    { title: 'Institution Building', shortDesc: 'Educational and institutional campuses.', icon: 'GraduationCap' },
    { title: 'Steel Structures', shortDesc: 'Robust and durable steel frameworks.', icon: 'Hammer' },
    { title: 'Ware Houses', shortDesc: 'Spacious and efficient storage facilities.', icon: 'Box' },
    { title: 'Tenements', shortDesc: 'Quality residential tenement projects.', icon: 'Home' },
    { title: 'Road Work', shortDesc: 'Durable infrastructure and road networks.', icon: 'Map' },
    { title: 'Irrigation & Canal Works', shortDesc: 'Advanced water management structures.', icon: 'Waves' },
    { title: 'Site Development Works', shortDesc: 'Comprehensive land and site preparation.', icon: 'MapPin' },
    { title: 'Landscape & Green Spaces', shortDesc: 'Beautiful and sustainable landscaping.', icon: 'Leaf' },
  ];

  console.log('Inserting new services...');
  await prisma.services.createMany({
    data: services.map((s, idx) => ({
      title: s.title,
      slug: s.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
      shortDesc: s.shortDesc,
      description: `We provide comprehensive engineering and construction services for ${s.title.toLowerCase()}. Our experienced team ensures that every project is completed on time, within budget, and to the highest standards of quality and safety, bringing your vision to life.`,
      icon: s.icon,
      order: idx + 1
    }))
  });

  console.log('Successfully updated services!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
