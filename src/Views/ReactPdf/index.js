import React from 'react';
import FlipBookV2 from '../../components/FlipBookV2';

const App = () => {
  return (
    <div className='page-container'>
      <div className='inner-page-container'>
        <FlipBookV2 url='/assets/doc/javascript_tutorial.pdf'/>
      </div>
    </div>
  )
}

export default App