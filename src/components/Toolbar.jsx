import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faInfoCircle} from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({onFullScreen}) => {
  return (
    <div className='toolbar'>
        <button className='btn-side-nav square'>
          <FontAwesomeIcon icon={faBars}/>
        </button>
        <a href='/term/term_policy.html' style={{border:"1px solid black"}}>Term</a>
        <div>Judul Buku</div>
        <div className='prop-action'>
          <button className='btn-toolbar-nav'>
            <FontAwesomeIcon icon={faInfoCircle}/>
            {" "}
            Properties
          </button>
          {/* <button className='btn-toolbar-nav square' onClick={onFullScreen}>
            <FontAwesomeIcon icon={faExpand}/>
          </button> */}
        </div>
      </div>
  )
}

export default Toolbar