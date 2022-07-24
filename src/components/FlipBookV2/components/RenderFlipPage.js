import React from 'react';

const RenderFlipPage = React.forwardRef((props, ref) => {
  return (
    <div className='page-flipbook' ref={ref}>
      {props.children}
    </div>
  )
})

export default RenderFlipPage