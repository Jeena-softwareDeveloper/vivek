import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // Services
  const servicesData = [
    {
      title: 'Urban Infrastructure',
      slug: 'urban-infrastructure',
      shortDesc: 'Urban infrastructure development is the foundation of every city and remains the key to ensuring basic service delivery and sustainable economic growth.',
      description: 'Our Urban Infrastructure division focuses on creating resilient, modern, and sustainable city foundations. We specialize in the development of robust water supply systems, state-of-the-art sewage treatment plants, smart city grid integrations, and comprehensive waste management facilities. With decades of experience in navigating complex urban environments, we ensure that every project not only meets current demands but is also future-proofed against rapid urbanization. Our team works closely with municipal bodies and urban planners to deliver projects that significantly enhance the quality of life for millions of residents while strictly adhering to environmental and safety regulations. From underground utility mapping to the final execution of large-scale public works, Vivek Vijay & Co. remains a trusted partner in building the cities of tomorrow.',
      image: '/images/placeholder.jpg',
      order: 1
    },
    {
      title: 'Advanced Technology Facilities',
      slug: 'advanced-technology-facilities',
      shortDesc: 'We stand at the forefront of delivering integrated turnkey solutions for Advanced Technology manufacturing and research environments.',
      description: 'Building for the future requires precision, specialized knowledge, and an uncompromising commitment to quality. Our Advanced Technology Facilities division is dedicated to constructing highly controlled environments, including semiconductor fabrication plants (fabs), pharmaceutical cleanrooms, biotech research laboratories, and hyperscale data centers. These projects demand rigorous adherence to stringent specifications regarding air quality, vibration control, thermal stability, and contamination prevention. We leverage cutting-edge Building Information Modeling (BIM) and advanced construction methodologies to execute these complex facilities seamlessly. Our proven track record in this sector demonstrates our ability to integrate sophisticated mechanical, electrical, and plumbing (MEP) systems with architectural precision, enabling our clients to push the boundaries of innovation in their respective fields.',
      image: '/images/placeholder.jpg',
      order: 2
    },
    {
      title: 'Transportation & Mobility',
      slug: 'transportation-mobility',
      description: 'Transportation networks are the arteries of a nation\'s economy. We are a leading player in India\'s transportation construction sector, encompassing metro rail networks, elevated corridors, national highways, and airport infrastructure. Our expertise spans the entire project lifecycle, from initial geotechnical surveys and structural design to the construction of complex viaducts, underground tunneling, and high-speed rail tracks. We utilize state-of-the-art heavy machinery and innovative engineering techniques to overcome challenging topographies and minimize public disruption during construction. By delivering high-quality, durable, and safe transportation infrastructure, we play a pivotal role in reducing transit times, improving connectivity, and fostering regional economic development.',
      shortDesc: 'We are a leading company in India\'s transportation sectors, providing robust solutions for metro rail, highways, and airport infrastructure.',
      image: '/images/placeholder.jpg',
      order: 3
    }
  ]

  for (const s of servicesData) {
    await prisma.services.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    })
  }

  console.log('Services seeded.')

  // Projects
  const projectsData = [
    {
      title: 'Perarignar Anna Thirumana Maaligai',
      slug: 'perarignar-anna-thirumana-maaligai',
      description: 'A landmark community marriage hall inaugurated by the Honorable Chief Minister of Tamil Nadu. This sprawling facility features state-of-the-art architectural design, blending traditional aesthetics with modern amenities. It includes a grand main hall capable of accommodating thousands of guests, a fully equipped mega-kitchen designed for massive catering operations, VIP suites, and extensive parking facilities. The construction involved complex structural engineering to ensure vast column-free spaces and optimal acoustics. This project stands as a testament to our ability to deliver monumental public infrastructure within strict timelines, serving the community for generations to come.',
      category: 'Commercial',
      status: 'completed',
      client: 'Government of Tamil Nadu',
      location: 'Tamil Nadu',
      year: 2023,
      featured: true,
      images: JSON.stringify(['/images/placeholder.jpg']),
      coverImage: '/images/placeholder.jpg'
    },
    {
      title: 'Metro Rail Phase II Elevated Corridor',
      slug: 'metro-rail-phase-ii-elevated-corridor',
      description: 'A critical segment of the city\'s expanding rapid transit network. This project involved the construction of an elevated viaduct spanning 15 kilometers, navigating through densely populated urban areas with minimal traffic disruption. Our scope included piling, pier construction, segmental launching, and the integration of three major interchange stations. We implemented advanced pre-cast technology and specialized launching gantries to accelerate the construction process while maintaining the highest safety standards. The successful completion of this corridor significantly reduced daily commute times for millions of citizens.',
      category: 'Infrastructure',
      status: 'ongoing',
      client: 'Metro Rail Corporation',
      location: 'Chennai',
      year: 2024,
      featured: true,
      images: JSON.stringify(['/images/placeholder.jpg']),
      coverImage: '/images/placeholder.jpg'
    },
    {
      title: 'TechPark Green IT Campus',
      slug: 'techpark-green-it-campus',
      description: 'An IGBC Platinum-rated IT SEZ campus spread across 20 acres. This project is a marvel of sustainable engineering, featuring energy-efficient facades, intelligent building management systems, a zero-liquid discharge water treatment plant, and extensive solar power integration. The campus includes multiple high-rise office towers, a central amenity hub, an amphitheater, and lush landscaped gardens. Our team managed the entire design-build process, ensuring seamless coordination between various specialized contractors. This project showcases our commitment to eco-friendly construction practices and our capability to execute world-class commercial real estate.',
      category: 'Commercial',
      status: 'completed',
      client: 'TechPark Developers',
      location: 'Coimbatore',
      year: 2022,
      featured: true,
      images: JSON.stringify(['/images/placeholder.jpg']),
      coverImage: '/images/placeholder.jpg'
    }
  ]

  for (const p of projectsData) {
    await prisma.projects.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }

  console.log('Projects seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
