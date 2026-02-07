import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance optimizations with error handling
const initializePerformanceOptimizations = async () => {
  try {
    const { preloadCriticalResources, addResourceHints } = await import('./utils/performance');
    addResourceHints();
    await preloadCriticalResources();
  } catch (error) {
    console.warn('Performance utilities failed to load:', error);
  }
};

// Initialize optimizations without blocking app render
initializePerformanceOptimizations();

createRoot(document.getElementById("root")!).render(<App />);
