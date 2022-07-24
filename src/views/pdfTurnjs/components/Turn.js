import React from 'react';
import PropsType from 'prop-types'
import $ from 'jquery';
import ReactTurnJs from '../../../components/react-turnjs';

const Turn = (props) => {
    const {onFlip} = props;
    const options = {
        autoCenter: true,
        acceleration: true,
        elevation: 50,
        gradients: !$.isTouch,
        when: {
            turned: (e, page) => {
                if(onFlip) onFlip(page);
            }
        }
    }
    return (
        <ReactTurnJs className="turnjs-container" options={options}>
            {props.children}
        </ReactTurnJs>
    )
}

Turn.propTypes = {
    onFlip: PropsType.func,
}

export default Turn