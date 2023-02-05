import './App.css';
import { BrowserRouter, BrowserRouter as Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddStudent from './Components/AddStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={["/home", "/"]} exact component={Home} />
        <Route path="/add-student" component={AddStudent} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
