import fs from "fs";

const baseUrl = "https://mangosorange.com";

// List all PUBLIC routes only (no /admin)
const routes = [
  "/", "/home", "/about", "/contact", "/terms-and-conditions",
  "/cloud-strategy", "/data-migration", "/managed-services", "/it-services",
  "/staffing", "/staffing/offshore-staffing", "/staffing/on-premise-staffing",
  "/staffing/contract-solutions", "/staffing/payroll-outsourcing",
  "/staffing/management-consulting", "/staffing/staffing-solutions",
  "/hmis", "/web-development", "/app-development", "/open-source",
  "/custom-software", "/ecommerce", "/hardware-services",
  "/it-consulting", "/system-integration", "/technical-support",
  "/blog", "/careers",
  "/cloud/aws", "/cloud/azure", "/cloud/gcp", "/cloud/multi-cloud",
  "/cloud/infrastructure-assessment", "/cloud/legacy-modernization",
  "/cloud/security", "/cloud/backup", "/cloud/disaster-recovery",
  "/cloud/compliance", "/cloud/cicd-pipelines", "/cloud/infrastructure-as-code",
  "/cloud/24-7-support"
];

const lastmod = new Date().toISOString().split("T")[0];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map(r => `  <url><loc>${baseUrl}${r}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log("sitemap.xml generated");
