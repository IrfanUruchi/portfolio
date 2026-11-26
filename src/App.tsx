import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { iulinuxPublicationsPath } from './data/iulinux';
import About from './pages/About';
import Contact from './pages/Contact';
import EngToolBox from './pages/EngToolBox';
import EngToolBoxPrivacy from './pages/EngToolBoxPrivacy';
import EngToolBoxSupport from './pages/EngToolBoxSupport';
import Home from './pages/Home';
import IOS from './pages/IOS';
import IOSDetail from './pages/IOSDetail';
import IULinux from './pages/IULinux';
import Models from './pages/Models';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import Research from './pages/Research';
import ResearchDetail from './pages/ResearchDetail';
import SmartStudyPlannerPrivacy from './pages/SmartStudyPlannerPrivacy';

function ScrollToRoute() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView?.();
    } else if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return <>
    <ScrollToRoute />
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/research" element={<Research />} />
        <Route path="/research/:slug" element={<ResearchDetail />} />
        <Route path="/models" element={<Models />} />
        <Route path="/books/iulinux" element={<Navigate to={iulinuxPublicationsPath} replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ios" element={<IOS />} />
        <Route path="/ios/engtoolbox" element={<EngToolBox />} />
        <Route path="/ios/engtoolbox/privacy" element={<EngToolBoxPrivacy />} />
        <Route path="/ios/engtoolbox/support" element={<EngToolBoxSupport />} />
        <Route path="/ios/smart-study-planner/privacy-policy" element={<SmartStudyPlannerPrivacy />} />
        <Route path="/ios/:slug" element={<IOSDetail />} />
        <Route path="/iulinux" element={<IULinux />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </>;
}
