import './App.css';
import PageMain from './pages/PageMain';
import PageReport from './pages/PageReport';
import {Navigation} from './components/Navigation';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Navigate to='/campanas'/>}/>
        <Route path = "/campanas" element={<PageMain/>}/>
        <Route path = "/reporte" element={<PageReport/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
