import './App.css';
import SignIn from './views/SignIn';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './views/Dashboard';
import IssueForm from './components/IssueForm';
import Details from './views/Details';
import { Look } from './views/Look';

function App() {
  return (
    <div className="App"
      style={{ 
      backgroundImage: `url("https://images5.alphacoders.com/737/737385.jpg")`,
      backgroundRepeat: 'no-repeat',
      height: '1000px', 
      opacity: "0.8"
    }}>
      

      <Routes>
        <Route path= "/" element={<SignIn/>}/>
        <Route path= "/dashboard" element={<Dashboard/>}/>
        <Route path='/issues/new' element={<IssueForm/>}/>
        <Route path='/issue/:id' element={<Details/>}/>
        <Route path='/test' element={<Look/>}/>
      </Routes>

    </div>
  );
}

export default App;
