
import './App.css';
import Login from './Components/Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Navbar from './Components/Pages/Navbar';
import Pageproduct from './Components/Pages/Pageproduct';
import Sales from './Components/Pages/Sales';
import Calcution from './Components/Pages/Calcution';
import Add from './Components/Pages/Add';
import Pract from './Components/Pages/Pract';
import Salestable from './Components/Pages/Salestable';
import Print from './Components/Pages/Print';
// import Pract from './Components/Pages/Pract';




function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
       {/* <Pract/> */}
       {/* <Calcution/> */}
       {/* <Add/> */}
        
        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route path='/navbar' element={<Navbar />} /> */}
          <Route path='/home' element={<Home />} />
          <Route path='/pageproduct' element={<Pageproduct />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/salestable' element={<Salestable />} />
          <Route path='/print' element={<Print/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
