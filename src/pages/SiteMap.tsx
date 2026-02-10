import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const routes = [
  '/',
  '/home',
  '/about',
  '/contact',
  '/terms-and-conditions',
  '/cloud-strategy',
  '/data-migration',
  '/managed-services',
  '/it-services',
  '/staffing',
  '/staffing/offshore-staffing',
  '/staffing/on-premise-staffing',
  '/staffing/contract-solutions',
  '/staffing/payroll-outsourcing',
  '/staffing/management-consulting',
  '/staffing/staffing-solutions',
  '/hmis',
  '/web-development',
  '/app-development',
  '/open-source',
  '/custom-software',
  '/ecommerce',
  '/hardware-services',
  '/it-consulting',
  '/system-integration',
  '/technical-support',
  '/blog',
  '/careers',
  '/cloud/aws',
  '/cloud/azure',
  '/cloud/gcp',
  '/cloud/multi-cloud',
  '/cloud/infrastructure-assessment',
  '/cloud/legacy-modernization',
  '/cloud/security',
  '/cloud/backup',
  '/cloud/disaster-recovery',
  '/cloud/compliance',
  '/cloud/cicd-pipelines',
  '/cloud/infrastructure-as-code',
  '/cloud/24-7-support',
];

const SiteMap = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Sitemap</h1>
        <p className="text-gray-800 mb-6">
          Browse all public pages on MangosOrange. Admin routes are intentionally excluded.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {routes.map((path) => (
            <Link
              key={path}
              to={path}
              className="rounded-lg border border-border px-4 py-3 text-foreground hover:bg-accent"
            >
              {path}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SiteMap;
