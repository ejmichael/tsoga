import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'
import LeadForm from './pages/LeadForm';
import Navbar from './components/Navbar';
function App() {
  return (
    // <HashRouter>
      <div className="App">
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<LeadForm/>}/>
            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route exact path='/contact-us' element={<LeadForm/>}/> */}
          </Routes>
      </div>
    // </HashRouter>  
  );
}

export default App;
