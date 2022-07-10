import React from 'react';
import {Route, Routes} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ReactPdf from '../views/react-pdf'; 
import './styles/index.style.css'

/*eslint-disable*/
const App = (props) => {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={<ReactPdf {...props} />}
        />
        <Route path='*' element={<div>Notfound</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App