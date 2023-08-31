import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './pages/Navbar';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Main from './pages/Main';
import Context from './Context';
import Login from './pages/Login';
import Register from './pages/Register';
import ExpForm from './pages/ExpForm';
import Details from './pages/Details';
function App() {
  return (
    <Context><Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/add" element={<ExpForm/>}/>
          <Route path="/details" element={<Details/>}/>
        </Routes>
      </Router>
    </Context>
  )
}

export default App
