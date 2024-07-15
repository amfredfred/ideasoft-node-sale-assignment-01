import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PurchaseNFT from './Views/Pages/PurchaseNFT'
import Batches from './Views/Pages/Batches';

function NotFound() {
  return (
    <div>
      <h1>404 - PEGE Not Found</h1>
      <Link className='navigate-link' to='batches'>Go To Batches</Link>
    </div>
  );
}

function App() {
  return (
    <Router  >
      <Routes>
        <Route path="/purchase" element={<PurchaseNFT />} />
        <Route index path="/batches" element={<Batches />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;