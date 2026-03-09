import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GlobalArchitecture from './pages/GlobalArchitecture';
import Audit from './pages/Audit';
import Insights from './pages/Insights';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Books from './pages/Books';
import About from './pages/About';
import WorkWithMe from './pages/WorkWithMe';
import NexZen from './pages/NexZen';
import Blog from './pages/Blog';
import GrowthOffers from './pages/GrowthOffers';
import ScrollToTop from './components/ScrollToTop';
import GoogleAdsLeadGen from './pages/blog/GoogleAdsLeadGen';
import SEOvsPaidAds from './pages/blog/SEOvsPaidAds';
import B2BLeadGenSystems from './pages/blog/B2BLeadGenSystems';
import WhyCampaignsFailToScale from './pages/blog/WhyCampaignsFailToScale';
import RandomLeadGen from './pages/blog/RandomLeadGen';
import GoogleAdsClicksNoCustomers from './pages/blog/GoogleAdsClicksNoCustomers';
import GoogleAdsROIMistakes from './pages/blog/GoogleAdsROIMistakes';
import WhenToHireAgency from './pages/blog/WhenToHireAgency';

export default function App() {
  return (
    <Router>
            <ScrollToTop /> {/* 👈 Add this */}

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/architecture" element={<GlobalArchitecture />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/nexzen" element={<NexZen />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/blog" element={<Blog />} />
           <Route path="/blog/google-ads-lead-generation-system" element={<GoogleAdsLeadGen />} />
          <Route path="/blog/seo-vs-paid-ads-roi" element={<SEOvsPaidAds />} />
          <Route path="/blog/b2b-lead-generation-systems-guide" element={<B2BLeadGenSystems />} />
          <Route path="/blog/why-marketing-campaigns-fail-to-scale" element={<WhyCampaignsFailToScale />} />
          <Route path="/blog/problem-with-random-lead-generation" element={<RandomLeadGen />} />
          <Route path="/blog/google-ads-clicks-no-customers" element={<GoogleAdsClicksNoCustomers />} />
          <Route path="/blog/biggest-google-ads-roi-mistakes" element={<GoogleAdsROIMistakes />} />
          <Route path="/blog/when-to-hire-marketing-agency" element={<WhenToHireAgency />} />
          <Route path="/growth-offers" element={<GrowthOffers />} />
          <Route path="/about" element={<About />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          <Route path="/contact" element={<WorkWithMe />} />
        </Routes>
      </Layout>
    </Router>
  );
}
