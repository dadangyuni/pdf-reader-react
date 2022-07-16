import React from 'react'
import HTMLFlipBook from 'react-pageflip'

const Flipviewer = React.forwardRef((props, ref) => {
    const {onFlip} = props
    return (
        <HTMLFlipBook 
            width={530} // base page width
            height={750} // base page height
            size="stretch"
            minWidth={315}
            maxWidth={800}
            minHeight={420}
            maxHeight={1200}
            showCover= {true}
            onFlip={onFlip}
            mobileScrollSupport={true}
            className={'flip-book'}
            disableFlipByClick={true}
            autoSize={true}
            style={{background:'#cecece'}}
            ref={ref}
        >
            {props.children}
        </HTMLFlipBook>
    )
})

export default Flipviewer