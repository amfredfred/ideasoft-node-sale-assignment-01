import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PurchaseNFT from './Views/Pages/PurchaseNFT'
import Batches from './Views/Pages/Batches';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/purchase" element={<PurchaseNFT />} />
        <Route path="/batches" element={<Batches />} />
      </Routes>
    </Router>
  );
}

export default App;