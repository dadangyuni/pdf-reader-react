import React from 'react';
import PropTypes from 'prop-types';  
import {Waypoint} from 'react-waypoint';
import { Page } from 'react-pdf/dist/esm/entry.webpack';

const PageRender = (props) => {
    const {number, scale = 1, fitTo, reference, onPageChange} = props;
    const handleWaypointEnter = page => {
        page && onPageChange(number);
    };

    const calculateScale = page => {
        const { fitTo, scale: globalScale = 1, container } = props;
        if (!page || !container) {
            return globalScale;
        }
        const pageScale = page.scale || 1;
        const { clientWidth, clientHeight } = container;

        const rotated =
            page.pageInfo.rotate === 90 || page.pageInfo.rotate === 270;
        const pageWidth = rotated ? page.originalHeight : page.originalWidth;
        const pageHeight = rotated ? page.originalWidth : page.originalHeight;
        const scaleX = clientWidth / pageWidth;
        const scaleY = clientHeight / pageHeight;
        if (fitTo === 'page') {
            return globalScale * Math.min(scaleX, scaleY);
        }
        if (fitTo === 'width') {
            return globalScale * scaleX;
        }
        return globalScale * pageScale;
    };

    return (
        <Waypoint
            topOffset="50%"
            bottomOffset="49%"
            onEnter={handleWaypointEnter}
            fireOnRapidScroll={false}
            key={number}
        >
            <div className="page-content">
                <Page pageNumber={number} scale={calculateScale()} 
                    renderTextLayer={true} inputRef={reference} 
                />
            </div>
        </Waypoint>
    );
}

PageRender.propTypes = {
    fitTo: PropTypes.oneOf(['page', 'width']),
    scale: PropTypes.number,
    pageCount: PropTypes.number,
    pages: PropTypes.object,
    onPageChange: PropTypes.func,
    reference: PropTypes.object
}

export default PageRender