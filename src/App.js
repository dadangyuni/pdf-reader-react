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
          element={<Home {...props} />}
        />
        <Route path='*' element={<div>Notfound</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App