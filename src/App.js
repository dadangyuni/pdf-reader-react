import React, { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import Footer from './components/Footer';
import Page from './components/Page';
import Toolbar from './components/Toolbar';
import './app.css';
/*eslint-disable*/
const App = (props) => {
  let evCache = [];
  let prevDiff = -1;
  let flipBook = React.useRef();
  const [fullScreen, setFullScreen] = useState(false);
  const [scale, setScale] = useState(1);
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
      outline: outline,
      refs: pdf.numPages && Array(pdf.numPages).fill("").map(() => React.createRef())
    }));
  }

  const nextButtonClick = () => {
    flipBook.current.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    flipBook.current.pageFlip().flipPrev();
  };

  const handleInit = async (params, ...rest) => {
    const {data:{page, mode, orientation}, object} = await params;
    const totalPage = object.pages.pages
    setBook(prev => ({
      ...prev,
      page: page,
      totalPage: totalPage.length,
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

  const onZoom = (value) => {
    if(value > 0) setScale(value);
  }

  const changeState= (data) => {
    console.log('data',data);
  }

  const pointerdown_handler = (ev) => {
    evCache.push(ev);
  }

  const pointermove_handler = (ev) => {
   
    // Find this event in the cache and update its record with this event
    for (var i = 0; i < evCache.length; i++) {
      if (ev.pointerId === evCache[i].pointerId) {
         evCache[i] = ev;
      break;
      }
    }
   
    // If two pointers are down, check for pinch gestures
    if (evCache.length === 2) {
      // Calculate the distance between the two pointers
      let curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
   
      if (prevDiff > 0) {
        if (curDiff > prevDiff) {
          // The distance between the two pointers has increased
          console.log("Pinch moving OUT -> Zoom in", ev);
          onZoom(scale + 0.2)
        }
        if (curDiff < prevDiff) {
          // The distance between the two pointers has decreased
          console.log("Pinch moving IN -> Zoom out",ev);
          onZoom(scale - 0.2)
        }
      }
   
      // Cache the distance for the next move event
      prevDiff = curDiff;
    }
  }

  const remove_event = (ev) => {
    // Remove this event from the target's cache
    for (let i = 0; i < evCache.length; i++) {
      if (evCache[i].pointerId === ev.pointerId) {
        evCache.splice(i, 1);
        break;
      }
    }
   }

  const pointerup_handler = (ev) => {
    remove_event(ev);
  }

  useEffect(()=>{
    let node = document.getElementById('reading-container');
    if(node){
      node.onpointerdown = pointerdown_handler;
      node.onpointermove = pointermove_handler;
      node.onpointerup = pointerup_handler;
      node.onpointercancel = pointerup_handler;
      node.onpointerout = pointerup_handler;
      node.onpointerleave = pointerup_handler;
    }
  },[])

  return (
    <div className='page-container'>
      <Toolbar onFullScreen={onFullScreen}/>
      <div className='content'>
        <div className='reading-container' id='reading-container' style={{transform:`scale(${scale})`}}>
            <Document 
              className={`custom-doc-wrapper`} 
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
                    onChangeState={changeState}
                    mobileScrollSupport={true}
                    ref={flipBook}
                    onInit={handleInit}
                    flippingTime={300}
                    onFlip={onPage}
                    className={'flip-book'}
                    style={{backgroundImage:'/assets/images/background.jpg'}}
                >
                  {[...Array(book.pdf.numPages).keys()].map(index =>{
                    return <Page key={index} number={index + 1}/>
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
        onZoomOut={()=>onZoom(scale - 0.5)}
        onZoomIn={()=>onZoom(scale + 0.5)}
      />
    </div>
  )
}

export default App