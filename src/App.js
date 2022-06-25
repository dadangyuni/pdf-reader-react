import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import Footer from './components/Footer';
import Page from './components/Page';
import Toolbar from './components/Toolbar';
import './app.css';

const App = (props) => {
  let flipBook = React.useRef();
  const [fullScreen, setFullScreen] = useState(false);
  const [book,setBook] = useState({
    file:null,
    pdf:{},
    outline: null,
    refs: null,
    page: 0,
    totalPage: 0,
    mode:"",
    orientation: ""
  });

  const onDocumentLoadSuccess = async (pdf) => {
    const outline = await pdf.getOutline();
    setBook(prev=>({
      ...prev,
      pdf:pdf,
      outline:outline,
      refs: pdf.numPages && Array(pdf.numPages).fill("").map(() => React.createRef())
    }));
    if(props.onLoad){
      props.onLoad(pdf)
    }
  }

  const nextButtonClick = () => {
    flipBook.current.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    flipBook.current.pageFlip().flipPrev();
  };

  const handleInit = (params, ...rest) => {
    const {data:{page, mode, orientation}, object} = params
    setBook(prev => ({
      ...prev,
      page: page,
      totalPage: object.pages.pages.length,
      mode, 
      orientation
    }));
  }

  const onFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  const onPage = (e) => {
    setBook(prev=>({
      ...prev,
      page: e.data,
    }));
  };

  return (
    <div className='page-container'>
      <Toolbar onFullScreen={onFullScreen}/>
      <div className='content'>
        <div className='reading-container'>
            <Document 
              className={`custom-doc-wrapper ${fullScreen ? 'full-screen': null}`} 
              renderTextLayer={false}
              file="/assets/document/javascript_tutorial.pdf" 
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <div className='container-book'>
                <HTMLFlipBook
                    width={530} // base page width
                    height={750} // base page height
                    size="stretch"
                    minWidth={315}
                    maxWidth={1000}
                    minHeight={420}
                    maxHeight={1350}
                    maxShadowOpacity="0.5" // Half shadow intensity
                    showCover= {true}
                    mobileScrollSupport={false}
                    ref={flipBook}
                    onInit={handleInit}
                    onFlip={onPage}
                    flippingTime={500}
                    className={'flip-book'}
                    style={{backgroundImage:'/assets/images/background.jpg'}}
                >
                  {[...Array(book.pdf.numPages).keys()].map(index =>{
                    return <Page key={index} number={index + 1} />
                  })}
                </HTMLFlipBook>
              </div>
            </Document>
        </div>
      </div>
      <Footer 
        flipBook={flipBook}
        onNext={nextButtonClick} 
        onPrev={prevButtonClick}
        page={book.page}
        totalPage={book.totalPage}
      />
    </div>
  )
}

export default App