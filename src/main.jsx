import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { UserProvider } from './utils/UserContext.jsx';
import Home from './pages/Home.jsx'
import LogSighting from './pages/LogSighting.jsx'
import MapView from './pages/MapView.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import SightingDetail from './pages/SightingDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/log" element={<LogSighting />}/>
          <Route path="/sighting/:id" element={<SightingDetail />}/>
          <Route path="/map" element={<MapView />}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
