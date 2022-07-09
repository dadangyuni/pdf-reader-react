import React, { useState } from 'react';
import './index.style.css';

const initialElement = {
  el: null, 
  scale: 1, 
  top: 0,
  left: 0,
  width: 0
}

const App = () => {
  let flipBook = React.useRef();
  const [viewBook, setViewBook] = useState({visible:false, targetElement:initialElement, loading:false});

  const showSample = (el) => {

    const pageComp = document.getElementById('page')
    if(pageComp){
      const bookContent = document.getElementById(el).getBoundingClientRect();
      const modalBook = document.getElementById('modal-content');
      const pageComp = document.getElementById('page').getBoundingClientRect();
      const body = document.getElementsByTagName('body')[0];
  
      const modalTop = modalBook.getBoundingClientRect().top;
      const modalLeft = modalBook.getBoundingClientRect().left;
  
      const scaleWidth = bookContent.width/( viewBook.targetElement.width ? viewBook.targetElement.width : pageComp.width);
  
      const targetLeft = body.clientWidth >= 750 ? bookContent.left - (
        (viewBook.targetElement.width ? viewBook.targetElement.width : pageComp.width)*scaleWidth) 
        : bookContent.left;
  
  
      setViewBook({visible:true, targetElement:{
        el, 
        scale: scaleWidth, 
        top: bookContent.top,
        width: viewBook.targetElement.width ? viewBook.targetElement.width : pageComp.width,
        left: targetLeft
      }});
  
      modalBook.setAttribute("style",`
        position: absolute;
        transform: scale(${scaleWidth});
        top:${bookContent.top}px;
        left:${targetLeft}px;
        transform-origin: 0px 0px;
      `);
      setTimeout(()=>{
        modalBook.classList.add('animated');
        flipBook.current.pageFlip().flip(1);
        modalBook.setAttribute("style",`
          position: absolute;
          top:${modalTop}px;
          left:${modalLeft}px;
        `);
      },500)
    }else{
      alert('wait for DOM Loaded...!!')
    }
    

  }

  const handleClose = () => {
    const targetEl = document.getElementById(viewBook.targetElement.el).getBoundingClientRect();
    const modalBook = document.getElementById('modal-content');
    const body = document.getElementsByTagName('body')[0];
    
    
    const modalTop = modalBook.getBoundingClientRect().top;
    const modalLeft = modalBook.getBoundingClientRect().left;
    
    
    const scaleWidth = viewBook.targetElement.scale;

    const targetLeft = body.clientWidth >= 750 ? targetEl.left - (viewBook.targetElement.width*scaleWidth) : targetEl.left;
    
    modalBook.setAttribute("style",`
      position: absolute;
      transform: scale(${scaleWidth});
      top:${targetEl.top}px;
      left:${targetLeft}px;
      transform-origin: 0px 0px;
    `);

    flipBook.current.pageFlip().flip(0);
    setTimeout(()=>{
      modalBook.classList.remove('animated');
      setViewBook(prev=>({...prev, visible:false}))
      setTimeout(()=>{
        modalBook.setAttribute("style",`
          position: absolute;
          top:${modalTop}px;
          left:${modalLeft}px;
        `);
      },200)
    },1000)
  }
  
  return (
    <div className='home-container'>
      <div className='content'>
        <div className='bookshelf'>
          <div className='shelf'>
            <div className='row row-1'>
              <div className='loc'>
                <div className="sample thumb1">
                  <div id='book-1' className='box' onClick={(e)=> showSample('book-1')}></div>
                </div>
                <div className="sample thumb1" >
                  <div id='book-2' className='box' onClick={(e)=>showSample('book-2')}></div>
                </div>
                <div className="sample thumb1">
                  <div id='book-3' className='box' onClick={(e)=> showSample('book-3')}></div>
                </div>
              </div>
            </div>
            <div className='row row-1'>
              <div className='loc'>
                <div className="sample thumb1">
                  <div id='book-4' className='box' onClick={(e)=> showSample('book-4')}></div>
                </div>
                <div className="sample thumb1" >
                  <div id='book-5' className='box' onClick={(e)=> showSample('book-5')}></div>
                </div>
                <div className="sample thumb1">
                  <div id='book-6' className='box' onClick={(e)=> showSample('book-6')}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='modal-book' id='modal-book' style={{visibility: viewBook.visible ? 'visible' : 'hidden'}}>
          <span className="close" onClick={()=>handleClose()}>&times;</span>
          <div id="modal-content" className="modal-content">
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default App