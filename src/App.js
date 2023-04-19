import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Home';
import FormDetails from './FormDetails';
import ScrollToTop from './ScrollToTop';
import ToxFormDetails from './ToxFormDetails';
import ValueFormDetails from './ValueFormDetails';
import EnvironmentFormDetails from './EnvironmentFormDetails';

function App() {

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/general/:submissionNumber' element={<FormDetails />} />
        <Route path='/value/:submissionNumber' element={<ValueFormDetails />} />
        <Route path='/tox/:submissionNumber' element={<ToxFormDetails />} />
        <Route path='/environment/:submissionNumber' element={<EnvironmentFormDetails />} />
      </Routes>
    </div>
  );
}

export default App;
