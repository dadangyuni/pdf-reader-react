import React, { useState, createContext } from 'react';
import { Document, pdfjs } from 'react-pdf/dist/esm/entry.webpack5';
import ControlBar from './ControlBar';
import FlipView from './FlipView';
import './style/index.css';

export const DataContext = createContext(null);
//url pdf file
const url = '/assets/doc/UbuntuServer10.04LTS.pdf';

const App = () => {
  const flipbook = React.useRef();
  const [book, setBook] = useState({
    file:null,
    pdf:{},
    outline: null,
    page: 1,
    totalPage: 0,
  });
  const documentConfig = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
  }

  const onDocLoadSucces = async (pdf) => {
    const outline = await pdf.getOutline();
    setBook(prev=>({
      ...prev,
      pdf: pdf,
      totalPage: pdf.numPages,
      outline: outline,
    }));
  }

  const onNavigate = (value) => {
    if(value >=1 && value <= book.totalPage){
      flipbook.current.pageFlip().flip(parseInt(value) - 1)
    }
  }

  return (
    <DataContext.Provider value={{book, setBook, flipbook}}>
      <div className='viewer-container' id='pg-flipe'>
        <div className='inner-container'>
          <div className='book-wrapper'>
            <div className='inner-book'>
              <Document 
                file={url} 
                options={documentConfig}
                onLoadSuccess={onDocLoadSucces}
              >
                <FlipView ref={flipbook}/>
              </Document>
            </div>
          </div>
          <div className='pf-thumbnails'>Thumbnails</div>
          <ControlBar
            page={book.page}
            onNavigate={onNavigate}
            total={book.totalPage}
          />
        </div>
      </div>
    </DataContext.Provider>
    
  )
}

export default App
