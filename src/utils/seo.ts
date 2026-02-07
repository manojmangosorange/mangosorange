// SEO utilities and structured data generators

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MangosOrange',
  description: 'Leading IT services company providing cloud solutions, software development, and staffing services.',
  url: 'https://mangosorange.co.in',
  logo: 'https://mangosorange.co.in/upload-image/ad985e4f-a179-4593-963e-c3031c12dcff.webp',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-120-416-4821',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    }
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi'
  },
  sameAs: [
    // Add social media links if available
  ]
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MangosOrange',
  url: 'https://mangosorange.co.in',
  description: 'Leading IT services company providing cloud solutions, software development, and staffing services.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://mangosorange.co.in/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
});

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  url: service.url,
  serviceType: service.serviceType,
  provider: {
    '@type': 'Organization',
    name: 'MangosOrange',
    url: 'https://mangosorange.co.in'
  },
  areaServed: {
    '@type': 'Country',
    name: 'India'
  }
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const generateJobPostingSchema = (job: {
  title: string;
  description: string;
  location: string;
  datePosted: string;
  validThrough: string;
  salary?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  datePosted: job.datePosted,
  validThrough: job.validThrough,
  hiringOrganization: {
    '@type': 'Organization',
    name: 'MangosOrange',
    sameAs: 'https://mangosorange.co.in'
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: job.location,
      addressCountry: 'IN'
    }
  },
  ...(job.salary && {
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary
      }
    }
  })
});

// Generate page-specific meta descriptions
export const generateMetaDescription = (page: string, content?: string): string => {
  const baseDescription = 'MangosOrange - Leading IT services company in India.';
  
  const descriptions: Record<string, string> = {
    home: 'MangosOrange provides comprehensive IT services including cloud solutions, software development, and staffing services across India.',
    about: 'Learn about MangosOrange, a trusted IT services provider with expertise in cloud infrastructure, custom software development, and professional staffing.',
    contact: 'Contact MangosOrange for IT services, cloud solutions, and staffing requirements. Get in touch with our expert team today.',
    careers: 'Join MangosOrange team. Explore exciting career opportunities in IT services, cloud computing, and software development.',
    'cloud-strategy': 'Expert cloud strategy and migration services by MangosOrange. Transform your business with our comprehensive cloud solutions.',
    staffing: 'Professional IT staffing solutions by MangosOrange. Find skilled developers, engineers, and IT professionals for your projects.',
    'web-development': 'Custom web development services by MangosOrange. Build scalable, responsive websites and web applications.',
    'app-development': 'Mobile and web application development services. Create innovative apps with MangosOrange expert development team.',
    'custom-software': 'Custom software development solutions tailored to your business needs. Expert development services by MangosOrange.',
    ecommerce: 'E-commerce development and solutions by MangosOrange. Build powerful online stores and digital commerce platforms.',
    hmis: 'Hospital Management Information System (HMIS) solutions by MangosOrange. Streamline healthcare operations with our expertise.',
    blog: 'MangosOrange blog and gallery. Latest updates, events, and milestones from our IT services company.'
  };
  
  return descriptions[page] || content || baseDescription;
};

// Generate page-specific keywords
export const generateKeywords = (page: string): string => {
  const baseKeywords = 'MangosOrange, IT services, software development, India';
  
  const keywords: Record<string, string> = {
    home: 'IT services India, cloud solutions, software development, staffing services, MangosOrange',
    about: 'IT company India, software development company, cloud services provider, MangosOrange team',
    contact: 'IT services contact, software development company contact, MangosOrange contact details',
    careers: 'IT jobs India, software developer jobs, cloud engineer careers, MangosOrange careers',
    'cloud-strategy': 'cloud migration, cloud strategy, AWS, Azure, Google Cloud, cloud consulting',
    staffing: 'IT staffing, software developer hiring, technical recruitment, offshore staffing',
    'web-development': 'web development, website design, responsive web design, web applications',
    'app-development': 'mobile app development, web app development, custom applications, React development',
    'custom-software': 'custom software development, bespoke software, enterprise software solutions',
    ecommerce: 'e-commerce development, online store development, e-commerce solutions, digital commerce',
    hmis: 'HMIS, hospital management system, healthcare software, medical information system',
    blog: 'MangosOrange blog, IT company news, technology updates, company events'
  };
  
  return keywords[page] || baseKeywords;
};