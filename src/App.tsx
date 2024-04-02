
import 'bootstrap/dist/css/bootstrap.min.css';

import ListEvent from './components/list-event'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ShowEvent } from './components/show-event';
import { AddEvent } from './components/add-event';


function App() {


  return (
    <>
    <BrowserRouter>
     <Routes>
      
        <Route path="/"  element={<ListEvent />} />
        <Route path="/event/:eventId" element={<ShowEvent/>} />
        <Route path="/add"  element={<AddEvent />} />
    
    </Routes>
    </BrowserRouter>
    
  
    </>
  )
}

export default App
