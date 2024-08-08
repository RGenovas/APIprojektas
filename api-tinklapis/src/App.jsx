import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddEntry from './pages/AddEntry';
import Homepage from './pages/Homepage';
import EntryDetails from './pages/EntryDetails';
import Search from './pages/Search';




const url = "http://localhost:3000/testroute"

function App() {

            
  return (
    <>
    <Router>

  
    <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/newentry' element={<AddEntry/>}/>
    <Route path='/details/:id' element={<EntryDetails/>}/>
    <Route path='/search' element={<Search/>}/>


    </Routes>
      
      </Router>
  </>
  )
}

export default App