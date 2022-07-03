import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Route, Routes} from 'react-router';
import FlipBook from './Views/Flipbook'; 


/*eslint-disable*/
const App = (props) => {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
            <React.Suspense fallback={<div>Loading</div>}>
              <FlipBook {...props} />
            </React.Suspense>}
        />
        <Route path='*' element={<div>Notfound</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App