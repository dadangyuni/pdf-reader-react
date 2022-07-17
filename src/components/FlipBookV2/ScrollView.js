import React, { useCallback, useEffect } from 'react';
import {AutoSizer, CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';
import RenderPageLong from './RenderPageLong';
/*eslint-disable*/
const RenderRow = ({index ,style, isVisible, isScrolling, parent, option, cache, onVisbleRow}) => {

    useEffect(()=>{
        isVisible && isScrolling && onVisbleRow(index)
    },[isVisible, isScrolling])

    return (
        <CellMeasurer
            cache={cache.current}
            columnIndex={0}
            rowIndex={index}
            parent={parent}
        >
            {({measure, registerChild}) => {
                return (
                    <div style={style} ref={registerChild} id={`page-${index + 1}`}>
                        <RenderPageLong number={index + 1}  
                            scale={option.scale}
                            onMeasure={measure}
                        />
                    </div>
                )
            }}
        </CellMeasurer>
    )
}


const ScrollView = (props) => {
    const {scrollTo, option, onViewPage, rowCount} = props;
    const cache = React.useRef(new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 50,
    }));

    const onVisbleRow = useCallback((index)=>{
        onViewPage(index);
    },[])

    return (
        <div style={{width:'100%', height:'100vh', overflow:'hidden'}}>
            <AutoSizer>
                {({width, height})=>{
                    return (
                        <List 
                            width={width}
                            height={height}
                            deferredMeasurementCache={cache.current}
                            rowHeight={cache.current.rowHeight}
                            rowCount={rowCount}
                            scrollToIndex={scrollTo - 1}
                            rowRenderer={(params) => {
                                return <RenderRow key={params.key} {...{...params, onVisbleRow,  cache, option}}/>
                            }}
                            overscanRowCount={10}
                        />
                    )
                }}
            </AutoSizer>
        </div>
    )
}

export default ScrollView