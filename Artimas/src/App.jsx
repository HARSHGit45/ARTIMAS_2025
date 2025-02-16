import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import HH from './pages/Houdieni Heist/HH';
import FireFliesBackground from './components/fireflies/FireFliesBackground.jsx';
import Pointer from './components/cursor/Pointer.jsx';
import Amngus from './pages/Among Us/Amngus.jsx';
import Hackmatrix from './pages/HackMatrix/Hackmatrix.jsx';
import Datathon from './pages/Datathon/Datathon.jsx';
import Footer from './components/footer/Footer.jsx';
import Pixel from './pages/pixel/Pixel.jsx';
import FoldableMap from './components/FoldableMap.jsx';
import Navbar from './components/Navbar.jsx';
import Team from './components/Team.jsx';
import Sponsor from './pages/sponsor/Sponsor.jsx';
import Calander from './pages/Calender/Calander.jsx';
import ThreeScene from './components/ThreeScene.jsx';

const Home = () => {
  return (
    <div>
        <ThreeScene />
    </div>
  );
};

function App() {
  return (
  
    <Router>
      <Navbar />
      <FireFliesBackground />
      <Pointer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/houdiniheist" element={<HH />} />
          <Route path="/amongus" element={<Amngus />} />
          <Route path="/datathon" element={<Datathon />} />
          <Route path="/hackmatrix" element={<Hackmatrix />} />
          <Route path='/pixelperfect' element={<Pixel />} />
          <Route path='/events' element={<FoldableMap />} />
          <Route path='/team' element={<Team />} />
          <Route path='/sponsor' element={<Sponsor/>} />
          <Route path='/calander' element={<Calander/>} />
        </Routes>
        <Footer />
    </Router>
  );

}

export default App;

