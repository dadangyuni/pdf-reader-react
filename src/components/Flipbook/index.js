import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document } from 'react-pdf';
import Footer from '../Footer';
import PageRender from '../Page';
import './index.css';
/*eslint-disable*/
const App = React.forwardRef((props, ref) => {
  const flipBook = ref;
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
            maxHeight={1500}
            showCover= {true}
            onChangeState={changeState}
            mobileScrollSupport={true}
            ref={ref}
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
)})

export default App