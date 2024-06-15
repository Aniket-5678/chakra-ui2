import {Routes, Route} from "react-router-dom"
import './App.css';
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import  { Toaster } from 'react-hot-toast';
import PrivateRoute from "./components/Routes/PrivateRoute";
import Dashboard from "./components/pages/Dashboard";




function App() {
  return (
    <div >
     <Toaster/>
    <Routes>
     
      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>}  />

      </Route>


    <Route path="/" element={<Signup/>} />
    <Route path="/login" element={<Login/>} />
     
    </Routes>
    </div>
  );
}

export default App;
