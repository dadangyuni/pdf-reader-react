import React from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack';

const PageRender = React.forwardRef((props, ref) => {
  const {number, scale = 1, reference} = props;
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <Page pageNumber={number}
            scale={scale}
            renderTextLayer={false} 
            renderAnnotationLayer={false} 
            inputRef={reference} 
        />
      </div>
    </div>
  );
  });

export default PageRender