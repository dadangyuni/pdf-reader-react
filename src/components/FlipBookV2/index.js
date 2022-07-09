import React, { useState } from 'react';
import { Document } from 'react-pdf/dist/esm/entry.webpack5';
import PageRender from './RenderPage';
import './styles/index.css';
import Toolbar from './Toolbar';

export const DataContext = React.createContext(null);

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

const App = (props) => {
    const flipBook = React.useRef();
    const [scale, setScale] = useState(1);
    const [book,setBook] = useState({
        file:null,
        pdf:{},
        outline: null,
        refs: null,
        page: 1,
        totalPage: 0,
        mode:"scroll",
        scale:1,
        orientation: ""
    });

    const onDocumentLoadSuccess = async (pdf) => {
        const outline = await pdf.getOutline();
        setBook(prev=>({
          ...prev,
          pdf:pdf,
          totalPage:pdf.numPages,
          outline: outline,
          refs: pdf.numPages && Array(pdf.numPages).fill("").map(() => React.createRef())
        }));
    }

    const onViewPage = (page) => {
        setBook(prev=>({...prev, page}))
    }

    return (
        <DataContext.Provider value={{flipBook,book, setBook}}>
            <div className='viewer-container'>
                <div className='inner-container'>
                    <div className='toolbar'>
                        <Toolbar 
                            totalPage={book.totalPage} 
                            current={book.page}
                        />
                    </div>
                    <div className='content-wrapper'>
                        <div className='content-viewer'>
                            <div className='inner-viewer'>
                                <Document 
                                    file="/assets/document/javascript_tutorial.pdf" 
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    options={options}
                                >
                                    {Array.apply(null, {length: book.pdf.numPages}).map((val, index) => {
                                            return index + 1;
                                        }).map((pages, i) =>{
                                        return <div key={i} className="page" id={`page-${pages}`} ref={book.refs[i]}>
                                            <PageRender number={pages} 
                                                scale={book.scale}
                                                reference={book.refs ? book.refs[i] : null}
                                                onPageChange={onViewPage}
                                            />
                                        </div>
                                    })}
                                </Document>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DataContext.Provider>
    )
};

export default App