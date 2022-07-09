import React from 'react';
import {DataContext} from './';

const Toolbar = (props) => {
    const {totalPage, pageFlip, current} = props;
    const {flipBook, book, setBook} = React.useContext(DataContext);
    const gotoPage = (e) => {
        e.preventDefault();
        const idx = e.target.value;
        if(idx){
            if(book.mode === 'scroll'){
                book.refs[idx].current.scrollIntoView();
                setBook(prev=>({...prev, page:idx}))
            }
        }
    }

    const handlePrev = (e) => {
        book.refs[current - 1].current.scrollIntoView();
    }

    const handleNext = (e) => {
        book.refs[current + 1].current.scrollIntoView();
    }

    return (
        <div className='toolbar-inner-container'>
            <div className='left-toolbar'>
                <button>bookmark</button>
                <button>Cari</button>
                <button onClick={handlePrev}>{"<"}</button>
                <input value={current || 0} className='input-page' type='number' onChange={gotoPage} min={1} max={totalPage}/>
                <span>/{totalPage}</span>
                <button onClick={handleNext}>{">"}</button>
            </div>
            <div className='center-toolbar'>
                <button>-</button>
                <select>
                    <option value={0.5}>50%</option>
                    <option value={0.75}>75%</option>
                    <option value={1}>100%</option>
                    <option value={1.5}>150%</option>
                    <option value={2}>200%</option>
                    <option value={2.5}>250%</option>
                </select>
                <button>+</button>
            </div>
            <div className='right-toolbar'>
                <button>dark mode</button>
                <button>fullScreen</button>
                <button>Scroll</button>
                <button>Book</button>
            </div>
        </div>
    )
}

export default Toolbar