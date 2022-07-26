import React, { Suspense } from 'react';
import {Route, Routes} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.style.css';

const PdfTurnjs = React.lazy(()=> import('../views/pdfTurnjs'));

/*eslint-disable*/
const App = (props) => {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
            <Suspense fallback={<>Loading...</>}>
              <PdfTurnjs {...props} />
            </Suspense>}
        />
        <Route path='*' element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App