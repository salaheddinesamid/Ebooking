import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { Home } from './routes/Home';
import SignUp from './routes/SignUp';
import { Listing } from './routes/Listing';
function App() {
  const listingId = localStorage.getItem("navigateListing");
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<SignUp/>} path='/registration'/>
        <Route element={<Listing listingId={listingId}/>} path={`/listing/${listingId}`}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
