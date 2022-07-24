import React from 'react';
import {Route, Routes} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import PdfTurnjs from '../views/pdfTurnjs';
import './styles/index.style.css'

/*eslint-disable*/
const App = (props) => {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={<PdfTurnjs {...props} />}
        />
        <Route path='*' element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App