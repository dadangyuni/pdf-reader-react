import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Route, Routes} from 'react-router';
import Home from './Views/Home'; 


/*eslint-disable*/
const App = (props) => {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={
            <React.Suspense fallback={<div>Loading</div>}>
              <Home {...props} />
            </React.Suspense>}
        />
        <Route path='*' element={<div>Notfound</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App