import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateMetaDescription, generateKeywords } from '@/utils/seo';

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/', '') || 'home';
    
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