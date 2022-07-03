import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document } from 'react-pdf';
import Footer from '../../components/Footer';
import PageRender from '../../components/Page';
import './index.css';
/*eslint-disable*/
const App = (props) => {
  let flipBook = React.useRef();
  const [fullScreen, setFullScreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [modal,setModal] = useState({visible:false,x:0, y:0,currentDemo:null});
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

  const changeState= (data) => {
    // console.log('data',data);
  }

  const onZoom = (value) => {
    if(value > 0) setScale(value);
  }

  const handleClose = () => {
    const modalContent = document.getElementById('modal-content');
    const currentDemo = document.getElementById(modal.currentDemo);

    const bookWidth = modalContent.getBoundingClientRect().width/2;
    const bookHeight = modalContent.getBoundingClientRect().height/2;
    const targetPositionLeft = currentDemo.getBoundingClientRect().left;
    const targetPositionTop = currentDemo.getBoundingClientRect().top;
    const positionLeft = modalContent.offsetLeft;
    const positionTop = modalContent.offsetTop;
    const scaleFrom = currentDemo.getBoundingClientRect().height/modalContent.getBoundingClientRect().height;
    const posX = (-bookWidth + modalContent.getBoundingClientRect().width/2)*scaleFrom +  bookWidth + positionLeft;
    const posY = -bookHeight*scaleFrom +  bookHeight + positionTop;
    const moveX = targetPositionLeft - posX;
    const moveY = targetPositionTop - posY;
    flipBook.current.pageFlip().flip(0);

    setTimeout(()=>{
      modalContent.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)'+
      'scale(' + scaleFrom + ',' + scaleFrom + ')';
      modalContent.style.zIndex = '1';
      document.getElementById('footer').style.opacity = '0';
      document.getElementById('modal-book').style.zIndex = '1'
    },300)

    setTimeout(() => {
      modalContent.style.visibility = 'hidden';
      setModal(prev=>({...prev,visible:false}));
    },800)
  }

  const handleClick = (el) => {
    const modalContent = document.getElementById('modal-content');
    const currentDemo = document.getElementById(el);
    modalContent.classList.remove('animate');
    if(modal.currentDemo != el){

      if(modal.currentDemo){
        const bookWidth = modalContent.getBoundingClientRect().width*4;
        const bookHeight = modalContent.getBoundingClientRect().height*4;
        const targetPositionLeft = currentDemo.getBoundingClientRect().left;
        const targetPositionTop = currentDemo.getBoundingClientRect().top;
        const scaleFrom = currentDemo.getBoundingClientRect().height/(modalContent.getBoundingClientRect().height*6);
        const posX =  targetPositionLeft - (bookWidth*1.2) + (bookWidth*scaleFrom);
        const posY = targetPositionTop - (bookHeight*1.1) + (bookHeight*scaleFrom*1.35);
        const moveX = posX;
        const moveY = posY;
        modalContent.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)'+'scale(' + scaleFrom + ',' + scaleFrom + ')';
      }else{
        const bookWidth = modalContent.getBoundingClientRect().width/2;
        const bookHeight = modalContent.getBoundingClientRect().height/2;
        const targetPositionLeft = currentDemo.getBoundingClientRect().left;
        const targetPositionTop = currentDemo.getBoundingClientRect().top;
        const positionLeft = modalContent.offsetLeft;
        const positionTop = modalContent.offsetTop;
        const scaleFrom = currentDemo.getBoundingClientRect().height/(modalContent.getBoundingClientRect().height);
        const posX = (-bookWidth + modalContent.getBoundingClientRect().width/2)*scaleFrom +  bookWidth + positionLeft;
        const posY = -bookHeight*scaleFrom +  bookHeight + positionTop;
        const moveX = targetPositionLeft - posX;
        const moveY = targetPositionTop - posY;
  
        modalContent.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)'+'scale(' + scaleFrom + ',' + scaleFrom + ')';
      }
    }
    setModal(prev=>({...prev,visible:true, currentDemo:el}));
    
    setTimeout(() => {
      modalContent.classList.add('animate');
      modalContent.style.visibility ="visible";
      document.getElementById('footer').style.opacity = '1';
      modalContent.style.transform ="";
      modalContent.style.zIndex = '3';
      document.getElementById('modal-book').style.zIndex = '3'
      flipBook.current.pageFlip().flip(1);
    }, 300);
  }

  return (
    <div className='page-container'>
      <div className='content'>
        <div className='bookshelf'>
          <div className='shelf'>
            <div className='row-1'>
              <div className='loc'>
                <div>
                  <div id='book-1' className="sample thumb1" style={{visibility: "visible"}} onClick={(e)=>handleClick('book-1')}></div>
                </div>
                <div>
                  <div id='book-2' className="sample thumb1" style={{visibility: "visible"}} onClick={(e)=>handleClick('book-2')}></div>
                </div>
                <div>
                  <div id='book-3' className="sample thumb1" style={{visibility: "visible"}} onClick={(e)=>handleClick('book-3')}></div>
                </div>
              </div>
            </div>
            <div className='row-2'>
              <div className='loc'>
                <div>
                  <div className="sample thumb2"></div>
                </div>
                <div>
                  <div className="sample thumb2"></div>
                </div>
                <div>
                  <div className="sample thumb2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='modal-book' id='modal-book' style={{visibility:modal.visible ? 'visible' : 'hidden'}}>
          <span className="close" onClick={()=>handleClose()}>&times;</span>
          <div id="modal-content" className="modal-content" style={{visibility:'hidden'}}>
            <div className='reading-container'  style={{transform:`scale(${scale})`}}>
              <div className='custom-doc-wrapper' id='custom-doc-wrapper'>
                <Document 
                  className={`container-book`}
                  file="/assets/document/javascript_tutorial.pdf" 
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <HTMLFlipBook
                      width={530} // base page width
                      height={750} // base page height
                      size="stretch"
                      minWidth={315}
                      maxWidth={1000}
                      minHeight={420}
                      maxHeight={1350}
                      showCover= {true}
                      onChangeState={changeState}
                      mobileScrollSupport={true}
                      ref={flipBook}
                      onInit={handleInit}
                      onFlip={onPage}
                      className={'flip-book'}
                      disableFlipByClick={true}
                      autoSize={true}
                      style={{backgroundImage:'/assets/images/background.jpg'}}
                  >
                      {[...Array(book.pdf.numPages).keys()].map(index =>{
                        return <PageRender key={index} number={index + 1}/>
                      })}
                  </HTMLFlipBook>
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
        </div>
      </div>
    </div>
  )
}

export default App