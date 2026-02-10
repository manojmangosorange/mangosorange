import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateMetaDescription, generateKeywords, generateOrganizationSchema, generateWebsiteSchema } from '@/utils/seo';

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/', '') || 'home';
    const canonicalUrl = `https://mangosorange.com${location.pathname === '/' ? '' : location.pathname}`;
    const titleMap: Record<string, string> = {
      home: 'MangosOrange Services Pvt. Ltd. | IT Services, Staffing & Payroll Outsourcing',
      about: 'About MangosOrange | IT Consulting & Staffing Company in Noida',
      contact: 'Contact MangosOrange | IT Services, Staffing & Payroll Outsourcing',
      careers: 'Careers at MangosOrange | IT Services & Staffing Jobs',
      staffing: 'Staffing Solutions | IT Staffing & Manpower Outsourcing',
      'cloud-strategy': 'Cloud Strategy & Migration | AWS, Azure, GCP Services',
      'web-development': 'Web Development Services | Business Automation',
      'app-development': 'App Development Services | Mobile & Web Apps',
      'custom-software': 'Custom Software Development | Enterprise Solutions',
      ecommerce: 'Ecommerce Development | Digital Commerce Platforms',
      hmis: 'HMIS Software | Hospital Management System',
      blog: 'MangosOrange Blog | IT Services, Staffing & Payroll Insights'
    };
    const pageTitle = titleMap[path] || 'MangosOrange Services Pvt. Ltd.';
    const pageDescription = generateMetaDescription(path);
    const pageKeywords = generateKeywords(path);
    
    // Title tag
    document.title = pageTitle;

    // Meta description
    const descMeta = document.querySelector('meta[name="description"]') ||
      document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    descMeta.setAttribute('content', pageDescription);
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(descMeta);
    }

    // Meta keywords (secondary signal)
    const keywordsMeta = document.querySelector('meta[name="keywords"]') ||
      document.createElement('meta');
    keywordsMeta.setAttribute('name', 'keywords');
    keywordsMeta.setAttribute('content', pageKeywords);
    if (!document.querySelector('meta[name="keywords"]')) {
      document.head.appendChild(keywordsMeta);
    }

    // Canonical
    const canonicalLink = document.querySelector('link[rel="canonical"]') ||
      document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', canonicalUrl);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonicalLink);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]') ||
      document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', pageTitle);
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]') ||
      document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    ogDesc.setAttribute('content', pageDescription);
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDesc);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]') ||
      document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', canonicalUrl);
    if (!document.querySelector('meta[property="og:url"]')) {
      document.head.appendChild(ogUrl);
    }

    const ogType = document.querySelector('meta[property="og:type"]') ||
      document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    if (!document.querySelector('meta[property="og:type"]')) {
      document.head.appendChild(ogType);
    }

    // Twitter card
    const twitterCard = document.querySelector('meta[name="twitter:card"]') ||
      document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    if (!document.querySelector('meta[name="twitter:card"]')) {
      document.head.appendChild(twitterCard);
    }

    // Structured data
    const orgSchemaId = 'org-schema';
    let orgSchema = document.getElementById(orgSchemaId) as HTMLScriptElement | null;
    if (!orgSchema) {
      orgSchema = document.createElement('script');
      orgSchema.type = 'application/ld+json';
      orgSchema.id = orgSchemaId;
      document.head.appendChild(orgSchema);
    }
    orgSchema.textContent = JSON.stringify(generateOrganizationSchema());

    const siteSchemaId = 'site-schema';
    let siteSchema = document.getElementById(siteSchemaId) as HTMLScriptElement | null;
    if (!siteSchema) {
      siteSchema = document.createElement('script');
      siteSchema.type = 'application/ld+json';
      siteSchema.id = siteSchemaId;
      document.head.appendChild(siteSchema);
    }
    siteSchema.textContent = JSON.stringify(generateWebsiteSchema());

    // Add viewport meta tag for mobile optimization
    const viewportMeta = document.querySelector('meta[name="viewport"]') ||
      document.createElement('meta');
    viewportMeta.setAttribute('name', 'viewport');
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    if (!document.querySelector('meta[name="viewport"]')) {
      document.head.appendChild(viewportMeta);
    }

    // Add robots meta tag
    const robotsMeta = document.querySelector('meta[name="robots"]') ||
      document.createElement('meta');
    robotsMeta.setAttribute('name', 'robots');
    robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    if (!document.querySelector('meta[name="robots"]')) {
      document.head.appendChild(robotsMeta);
    }

    // Add theme color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]') ||
      document.createElement('meta');
    themeColorMeta.setAttribute('name', 'theme-color');
    themeColorMeta.setAttribute('content', '#1a365d'); // Your primary color
    if (!document.querySelector('meta[name="theme-color"]')) {
      document.head.appendChild(themeColorMeta);
    }

    // Add mobile web app capable
    const webAppMeta = document.querySelector('meta[name="mobile-web-app-capable"]') ||
      document.createElement('meta');
    webAppMeta.setAttribute('name', 'mobile-web-app-capable');
    webAppMeta.setAttribute('content', 'yes');
    if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
      document.head.appendChild(webAppMeta);
    }

    // Add apple touch icon if not exists
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
      appleTouchIcon.setAttribute('href', '/upload-image/ad985e4f-a179-4593-963e-c3031c12dcff.webp');
      document.head.appendChild(appleTouchIcon);
    }

    // Add preconnect links for external resources
    const preconnectUrls = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectUrls.forEach(url => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        if (url.includes('fonts.gstatic.com')) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      }
    });

  }, [location.pathname]);

  return null;
};

export default SEOHead;
