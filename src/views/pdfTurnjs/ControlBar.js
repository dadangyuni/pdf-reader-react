import React, { useEffect } from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import {DataContext} from './';
/*eslint-disable*/ 
const ControlBar = (props) => {
    const {page, total, onNavigate} = props;
    const {flipbook} = React.useContext(DataContext);
    const [form] = Form.useForm();

    const handleNavigate = (e) => {
        if(onNavigate) onNavigate(e.target.value);
    }

    const onNext = () => {
        if(page <= total) flipbook.current.pageFlip().flipNext();
    }

    const onPrev = () => {
        if(page > 1) flipbook.current.pageFlip().flipPrev();
    }

    const gotoFirst = () => {
        onNavigate(1);
    }

    const gotoLast = () => {
        onNavigate(total);
    }

    useEffect(()=>{
        form.setFieldsValue({page:page})
    },[page])

    return (
        <div className='pf-controls'>
            <div className='control-bar'>
                <div className='controlbar-container'>
                    <div className='controlbar-page-nav'>
                        <button aria-label='goto-first' onClick={gotoFirst}><i className="fas fa-step-backward"></i></button>
                        <button aria-label='goto-previous' onClick={onPrev}><i className="fas fa-caret-left"></i></button>
                        <Form form={form} className="form-navigate">
                            <Form.Item name="page" preserve={false}>
                                <Input className='current-page-input' onPressEnter={handleNavigate} />
                            </Form.Item>
                        </Form>
                        <button aria-label='goto-next' onClick={onNext}><i className="fas fa-caret-right"></i></button>
                        <button aria-label='goto-last' onClick={gotoLast}><i className="fas fa-step-forward"></i></button>
                    </div>
                    <div className='controlbar-others-btn'>
                        <button aria-label='search-in-page'><i className="fas fa-search"></i></button>
                        <button aria-label='show-thumbnail'><i className="fas fa-th"></i></button>
                        <button aria-label='fullscreen-mode'><i className="fas fa-expand"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ControlBar.propTypes = {
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onNavigate: PropTypes.func.isRequired,
}

export default ControlBar