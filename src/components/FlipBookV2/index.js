import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import { Document } from 'react-pdf/dist/esm/entry.webpack5';
import Toolbar from './Toolbar';
import PageRender from './RenderPage';
import OutlineItems from './OutlineItems';
import {RenderFlipPage} from './components';
import Flipviewer from './Flipviewer';
import ScrollView from './ScrollView';
import './styles/index.css';

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

    const onViewPage = (page) => {
        setBook(prev=>({...prev, page}))
    }

    const onOutlineClick  = ({pageNumber}) => {
        setBook(prev=>({...prev, page:pageNumber}))
    }

    const handleFlip = (e) => {
        // if(e.data){
        //     setBook(prev=>({...prev, page:e.data}))
        // }
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
                                    {/* scroll view start */}
                                    {option.mode === 'scroll' && book.pdf.numPages && <ScrollView
                                        rowCount={book.pdf.numPages}
                                        option={option}
                                        onViewPage={onViewPage}
                                        scrollTo={parseInt(book.page)}
                                    />}
                                    {/* scroll view end */}

                                    {/* scroll view start */}
                                    {option.mode === 'flip' && <Flipviewer onFlip={handleFlip} ref={flipBook}>
                                        { book.pdf.numPages && Array.from(new Array(book.pdf.numPages), (el, i) =>{
                                            return <RenderFlipPage key={i} number={i+1}>
                                                <PageRender number={i + 1} 
                                                    scale={1}
                                                    onPageChange={onViewPage}
                                                    disabledWay={false}
                                                />
                                            </RenderFlipPage>
                                        })}
                                    </Flipviewer>}
                                    {/* flipbook view end */}
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