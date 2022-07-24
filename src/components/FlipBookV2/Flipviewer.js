import React from 'react';
import $ from 'jquery';
import Turn from '../react-turnjs';
import {DataContext} from './';
import RenderPageLong from './RenderPageLong';

const Flipviewer = (props) => {  
    const { book, option } = React.useContext(DataContext); 
    const options = {
        width: 800,
        height: 600,
        autoCenter: true,
        display: "double",
        acceleration: true,
        elevation: 50,
        gradients: !$.isTouch,
        when: {
          turned: function(e, page) {
            console.log("Current view: ", $(this).turn("view"));
          }
        }
    } 
    return (
        <div className='outer-flipbook-container'>
            <div className='inner-flipbook'>
            {book.pdf.numPages && <Turn options={options} className="magazine">
                {[...Array(book.pdf.numPages).keys()].map((__, index) => (
                    <RenderPageLong key={index} number={index + 1}  scale={option.scale} />
                ))}
            </Turn>}
            </div>
        </div>
    )
}

export default Flipviewer