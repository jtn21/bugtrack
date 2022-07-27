import './App.css';
import SignIn from './components/SignIn';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= "/" element={<SignIn/>}/>
        <Route path= "/dashboard" element={<Dashboard/>}/>

      </Routes>

    </div>
  );
}

export default App;
