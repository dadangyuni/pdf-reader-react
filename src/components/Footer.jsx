import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import React from 'react'

const Footer = ({onNext, onPrev, page, totalPage, flipBook, onZoomOut, onZoomIn}) => {
  return (
    <div className='footer'>
        <div className='info-page'>Page {page + 1} of {totalPage}</div>
        <div className='nav-wrapper'>
          <button className='btn-prev' onClick={()=>onPrev()}>
            <FontAwesomeIcon icon={faChevronLeft}/>
            {" "}
            Previous
          </button>
          <button className='btn-next' onClick={()=>onNext()}>
            Next
            {" "}
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className='page-set-wrapper'>
          <button className='btn-blue square' onClick={()=>onZoomOut()}>
              <FontAwesomeIcon icon={faMagnifyingGlassMinus}/>
            </button>
            <button className='btn-blue square' onClick={()=>onZoomIn()}>
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </button>
        </div>
      </div>
  )
}

export default Footer