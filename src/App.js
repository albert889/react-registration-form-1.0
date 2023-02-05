import './App.css';
import { BrowserRouter, BrowserRouter as Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddStudent from './Components/AddStudent';
import Loader from "./Components/Loader";
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div>

      {
        loading ?
          <div className='loader'>
            <Loader></Loader>
          </div>
          :
          <BrowserRouter>
            <Routes>
              <Route path={["/home", "/"]} exact component={Home} />
              <Route path="/add-student" component={AddStudent} />
            </Routes>
          </BrowserRouter>
      }
    </div>
  );
}

export default App;
