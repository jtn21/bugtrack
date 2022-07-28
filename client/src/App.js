import './App.css';
import SignIn from './views/SignIn';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './views/Dashboard';
import IssueForm from './components/IssueForm';
import Details from './views/Details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= "/" element={<SignIn/>}/>
        <Route path= "/dashboard" element={<Dashboard/>}/>
        <Route path='/issues/new' element={<IssueForm/>}/>
        <Route path='/issue/:id' element={<Details/>}/>
      </Routes>

    </div>
  );
}

export default App;
