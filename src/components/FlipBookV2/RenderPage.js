import React from 'react';
import PropTypes from 'prop-types';
import { Page } from 'react-pdf/dist/esm/entry.webpack';
import {DataContext} from './';
import LoadingPage from './components/LoadingPage';

const PageRender = (props) => {
    const { fitTo, scale: globalScale = 1, container, number } = props;
    const {book} = React.useContext(DataContext);

    const calculateScale = page => {
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

    const removeTextLayerOffset = () => {
        const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
        textLayers.forEach(layer => {
            const { style } = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
            style['z-index']="1";
        });
    }

    return (
        <div className="page-content">
            <Page pageNumber={number} scale={calculateScale()}
                renderTextLayer={true} inputRef={
                    parseInt(book.page) === parseInt(number) ? (ref) => ref && ref.scrollIntoView() : null
                } 
                loading={<LoadingPage/>} 
                onLoadSuccess={removeTextLayerOffset}
            />
        </div>
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