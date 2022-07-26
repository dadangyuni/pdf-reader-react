import React from 'react';
import {DataContext} from './index';
import {HTMLPageflip} from './components';

const FlipView = React.forwardRef((props,ref) => {
    const {book, setBook} = React.useContext(DataContext);
    const onFlip = (page) => {
        setBook(prev=>({...prev, page}))
    }
    return (
        <div className='flipbook-container'>
            <HTMLPageflip 
                ref={ref}
                current={book.page} 
                total={book.totalPage} 
                onFlip={onFlip}
            />
        </div>
    )
})

export default FlipView