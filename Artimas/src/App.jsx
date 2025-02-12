import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import HH from './pages/Houdieni Heist/HH';

import Header from './components/Header/Header.jsx'
import Pointer from './components/cursor/Pointer.jsx';
import Amngus from './pages/Among Us/Amngus.jsx';
import Hackmatrix from './pages/HackMatrix/Hackmatrix.jsx';
import Datathon from './pages/Datathon/Datathon.jsx';
import FireFliesBackground from './components/fireflies/FireFliesBackground.jsx';
import FoldableMap from './components/FoldableMap.jsx';
import Footer from './components/footer/Footer.jsx';

import Pixel from './pages/pixel/Pixel.jsx'

const Home = () => {
  const navigate = useNavigate();
  
  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Events</h1>
      <div className="flex gap-4">
        <button onClick={() => navigate('/Houdini')} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
          Event 1
        </button>
        <button onClick={() => navigate('/amongus')} className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600">
          Event 2
        </button>
        <button onClick={() => navigate('/datathon')} className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600">
          Event 3
        </button>
        <button onClick={() => navigate('/pixel')} className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600">
          Event 4
        </button>

        <button onClick={() => navigate('/hackmatrix')} className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600">
          Event 5
        </button>

      </div>
    </div>
 
  );
};

function App() {
  return (
    
    
    <Router>
    <Header />
      <FireFliesBackground/>
      <Pointer />
     
     
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Houdini" element={<HH />} />
        <Route path="/amongus" element={<Amngus />} />
        <Route path="/datathon" element={<Datathon />} />
        <Route path="/pixel" element={<Pixel />} />
        <Route path="/hackmatrix" element={<Hackmatrix />} />

        <Route path='/pixel' element={<Pixel />} />

      </Routes>


      <Footer />
    </Router>
  );
}

export default App;
