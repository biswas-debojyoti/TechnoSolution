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

export default function App() {
  return (
    <Router>
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
          <Route path="/about" element={<About />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          <Route path="/contact" element={<WorkWithMe />} />
        </Routes>
      </Layout>
    </Router>
  );
}
