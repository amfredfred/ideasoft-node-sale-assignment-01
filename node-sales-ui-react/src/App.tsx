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


function WelcomePage() {
  return (
    <div>
      <h1>Buy 1/10th fractionalized NFTs.</h1>
      <div className=" " style={{ display: 'flex', gap: '1rem' }}>
        <Link className='navigate-link' to='batches'>Batches</Link>
        <Link className='navigate-link' to='purchase'>Buy Now</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router  >
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/purchase" element={<PurchaseNFT />} />
        <Route index path="/batches" element={<Batches />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;