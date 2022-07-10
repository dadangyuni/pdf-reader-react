import React, { useState } from 'react';
import PropTypes from 'prop-types';  
import { Document } from 'react-pdf/dist/esm/entry.webpack5';
import PageRender from './RenderPage';
import './styles/index.css';
import Toolbar from './Toolbar';
import OutlineItems from './OutlineItems';

export const DataContext = React.createContext(null);

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

const FlipBookReact = (props) => {
    const {url} = props;
    const flipBook = React.useRef();
    const [option, setOption] = useState({
        scale:1,
        fitTo:'page',
        limit:4,
        fullScreen:false,
        pageHeight:841,
        mode:"scroll",
        orientation: "",
        theme:'light',
        showBookmark:false
    });
    const [book,setBook] = useState({
        file:null,
        pdf:{},
        outline: null,
        page: 1,
        totalPage: 0,
    });

    const onDocumentLoadSuccess = async (pdf) => {
        const outline = await pdf.getOutline();
        setBook(prev=>({
          ...prev,
          pdf:pdf,
          totalPage:pdf.numPages,
          outline: outline,
        }));
    }

    const calculateScroll = () => {
        if(book.pdf.numPages){
            return book.pdf.numPages * option.scale * option.pageHeight
        }
        return 'auto'
    }

    const onViewPage = (page) => {
        setBook(prev=>({...prev, page}))
    }

    const limitNumberWithinRange = (num, min = 1, max = 20) => {
        const parsed = parseInt(num);
        return {
            min: Math.min(parsed, min),
            max: Math.max(parsed, max)
        }
    }

    const onOutlineClick  = ({pageNumber}) => {
        setBook(prev=>({...prev, page:pageNumber}))
    }

    return (
        <DataContext.Provider value={{flipBook,book,option,setBook,setOption}}>
            <div className='viewer-container'>
                <div id='inner-container' className='inner-container'>
                    <div className='toolbar'>
                        <Toolbar 
                            totalPage={book.totalPage} 
                            current={book.page}
                        />
                    </div>
                    <div className='content-wrapper'>
                        <OutlineItems onClickItem={onOutlineClick}/>
                        <div className='content-viewer'>
                            <div className='inner-viewer'>
                                <Document 
                                    file={url} 
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    options={options}
                                >
                                    {option.mode === 'scroll' && <div style={{height:calculateScroll()}}>
                                        { book.pdf.numPages && Array.from(new Array(book.pdf.numPages), (el, i) =>{
                                            const page = parseInt(book.page)
                                            const {min, max} = limitNumberWithinRange(page, page > 4 ? page - 3 : 1, page + 4)
                                            if(i + 1 >= min && i+1 <= max){
                                                return <div key={i} className="page" id={`page-${i + 1}`}>
                                                    <PageRender number={i + 1} 
                                                        scale={option.scale}
                                                        onPageChange={onViewPage}
                                                        disabledWay={false}
                                                    />
                                                </div>
                                            }
                                            return null
                                        })}
                                    </div>}
                                    
                                    {option.mode === 'flip' && <div className='flipbook-wrapper'>
                                        
                                    </div>}
                                </Document>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DataContext.Provider>
    )
};

FlipBookReact.propTypes = {
    url:PropTypes.string.isRequired
}

export default FlipBookReact