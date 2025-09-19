import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import './App.css'
import ThankYou from './ThankYou';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="ThankYou" element={<ThankYou/>} />
      </Routes>
    </BrowserRouter>
  );
}
