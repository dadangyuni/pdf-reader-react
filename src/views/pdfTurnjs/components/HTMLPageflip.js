import React from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack5';
import PropsType from 'prop-types';
import HTMLFlipBook from "react-pageflip";
import LoadingPage from './LoadingPage';
/*eslint-disable*/ 
const RenderPage = React.forwardRef((props, ref) => {
    const {pageNumber} = props;
    return (
        <div className="page" id={`page-${pageNumber}`} ref={ref}>
            <div className="page-content">
                <Page pageNumber={pageNumber} 
                    renderTextLayer={false}  
                    renderAnnotationLayer={false}
                    loading={<LoadingPage />}
                />
            </div>
        </div>
    );
});

const HTMLPageflip = React.forwardRef((props, ref) => {
    const {total, onFlip} = props;
    const onPage = ({data}) => {
        onFlip && onFlip(data + 1)
    }

    const onChangeOrientation = () => {

    }

    const onChangeState = () => {

    }

    return (
        <HTMLFlipBook
            width={550}
            height={713}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={380}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onPage}
            onChangeOrientation={onChangeOrientation}
            onChangeState={onChangeState}
            swipeDistance={5}
            className="flipbook-comp"
            ref={ref}
        >
            {total && [...Array(15).keys()].map((__,index) => {
                return <RenderPage key={index} pageNumber={index+1} />
            })}
        </HTMLFlipBook>
    )
})

HTMLPageflip.propsType = {
    total: PropsType.number.isRequired,
    current: PropsType.number.isRequired,
    onFlip: PropsType.func
}


export default HTMLPageflip