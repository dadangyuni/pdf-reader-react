import React from 'react'
import { Page } from 'react-pdf/dist/esm/entry.webpack5';
import { LoadingPage } from './components';

const RenderPage = (props) => {
    const { pageNumber} = props;

    return (
        <>
            <div className={`page-content ${pageNumber <= 1 && '.hard'}`} id={`page-${pageNumber}`}>
                <Page pageNumber={pageNumber} 
                    renderTextLayer={false}  
                    renderAnnotationLayer={false}
                    loading={<LoadingPage/>}
                />
            </div>
        </>
    )
}

export default RenderPage