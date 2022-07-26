import React from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack5';
import PropsType from 'prop-types';
import HTMLFlipBook from "react-pageflip";
import LoadingPage from './LoadingPage';
import { useGesture } from '@use-gesture/react';
import useCustomReducer from '../utils/useCustomreducer';
/*eslint-disable*/ 

const initialState = {
    crop: { x: 0, y: 0, scale: 1, active: false }
}

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


const MemoizedRenderPage= React.memo(RenderPage);

const HTMLPageflip = React.forwardRef((props, ref) => {
    const {total, onFlip} = props;
    const viewRef = React.useRef();
    const [dataReduc, setReduc] = useCustomReducer(initialState);

    useGesture({
        onDrag:({ offset: [dx, dy]})=>{
            if(dataReduc.crop.scale.toFixed(2) > 1.2){
                setReduc('crop',{x: dx, y: dy, active: true});
            }
        },
        onDragEnd:()=>{
            setReduc('crop',{active: false});
        },
        onPinch:({ offset: [d]})=>{
            if(1 + d / 50 < 1.05){
                setReduc('crop',{x:0, y:0 , scale: 1 + d / 50, active: true});
            }else{
                setReduc('crop',{scale: 1 + d / 50, active: true});

            }
        },
        onPinchEnd: () => {
            setReduc('crop',{active: false});
        }
    },{
        target: viewRef,
        eventOptions:{passive:false}
    })

    const onPage = ({data}) => {
        onFlip && onFlip(data + 1)
    }

    const onChangeOrientation = () => {

    }

    const onChangeState = () => {

    }

    return (
        <div ref={viewRef}
            style={{
                top:dataReduc.crop.y,
                left:dataReduc.crop.x,
                maxHeight: 'none',
                maxWidth:'none',
                transform: `scale(${dataReduc.crop.scale})`,
                touchAction: "none",
                position:'relative',
                width:'auto',
                cursor: dataReduc.crop.active ? 'pointer' : 'initial'
            }}
        >
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
                onFlip={onPage}
                renderOnlyPageLengthChange={true}
                onChangeOrientation={onChangeOrientation}
                onChangeState={onChangeState}
                className="flipbook-comp"
                ref={ref}
                mobileScrollSupport={dataReduc.crop.scale.toFixed(2) > 1.2 ? false : true}
                disableFlipByClick={true}
                style={{
                    pointerEvents: dataReduc.crop.scale.toFixed(2) > 1.2 ? 'none' : 'all',
                }}
            >
                {total && [...Array(15).keys()].map((__,index) => {
                    return <MemoizedRenderPage key={index} pageNumber={index+1} />
                })}
            </HTMLFlipBook>
        </div>
    )
})

HTMLPageflip.propsType = {
    total: PropsType.number.isRequired,
    current: PropsType.number.isRequired,
    onFlip: PropsType.func
}


export default HTMLPageflip