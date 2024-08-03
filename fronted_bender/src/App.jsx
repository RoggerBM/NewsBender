import './App.css';
import PageMain from './pages/PageMain';
import PageReport from './pages/PageReport';
import {Navigation} from './components/Navigation';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { MainResume } from './components/main-campanas/MainResume';
import { CuadroMando } from './components/CuadroMando';
import { Body } from './components/Body';
import { CampanaView } from './components/view-campanas/CampanaView';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/reporte/mando' />} />
        <Route path='/campanas' element={<PageMain />} />
        <Route path='/reporte' element={<PageReport />}>
          <Route path='home' element={<MainResume />} />
          <Route path='mando' element={<CuadroMando />} />
          <Route path='body' element={<Body />} />
          <Route path='subcampana/:id' element={<CampanaView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
