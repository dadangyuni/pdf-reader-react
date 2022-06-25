import React, { useState } from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack';

const PageRender = React.forwardRef((props, ref) => {
  const {number,style, reference} = props;
  const [pages,setPage] = useState();
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <Page style={style} pageNumber={number}
            scale={1}
            renderTextLayer={false} renderAnnotationLayer={false} 
            inputRef={reference} onLoadSuccess={page =>
                setPage({ ...pages, [page.pageIndex]: page })
            }
        />
      </div>
    </div>
  );
  });

export default PageRender