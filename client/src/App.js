import { Routes, Route } from 'react-router-dom'
import LeadForm from './pages/LeadForm';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<div>Home</div>}/>
            <Route exact path='/contact-us' element={<LeadForm/>}/>
          </Routes>
    </div>
  );
}

export default App;
