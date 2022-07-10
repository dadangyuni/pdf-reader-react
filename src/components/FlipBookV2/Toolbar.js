import React, { useEffect } from 'react';
import { Button, Form, InputNumber } from 'antd';
import {DataContext} from './';
/*eslint-disable*/ 
const Toolbar = (props) => {
    const {totalPage, current} = props;
    const { book, setBook, option, setOption} = React.useContext(DataContext);
    const [form] = Form.useForm();
    const gotoPage = (e) => {
        const idx = e.target.value;
        console.log(idx);
        if(idx && idx >= 1 &&  idx <= totalPage){
            if(book.mode === 'scroll'){
                setBook(prev=>({...prev, page:idx}))
            }
        }
    }

    const handlePrev = (e) => {
        if(current > 1){
            setBook(prev=>({...prev, page:prev.page - 1}))
        }
    }

    const handleNext = (e) => {
        if(current < totalPage){
            setBook(prev=>({...prev, page:prev.page + 1}))
        }
    }

    const toogleFullscreen = () => {
        if(option.fullScreen){
            document.exitFullscreen();
            setOption(prev=>({...prev, fullScreen:false}))
        }else{
            document.documentElement.requestFullscreen();
            setOption(prev=>({...prev, fullScreen:true}))

        }
    }
    
    useEffect(()=>{
        form.setFieldsValue({page:current});
    },[current])

    return (
        <div className='toolbar-inner-container'>
            <div className='left-toolbar'>
                <Button className='btn-icon-only'><i className="far fa-bookmark"></i></Button>
                <Button className='btn-icon-only'><i className="fas fa-search"></i></Button>
                <Button className='btn-icon-only' onClick={handlePrev}><i className="fas fa-angle-left"></i></Button>
                <Form form={form}>
                    <Form.Item name='page' className='formitem-goto'>
                        <InputNumber className='input-page' 
                            style={{width:'60px'}} 
                            onPressEnter={gotoPage} 
                            min={1} 
                            max={totalPage}
                            controls={false}
                        />
                    </Form.Item>
                </Form>
                <span>/{totalPage}</span>
                <Button className='btn-icon-only' onClick={handleNext}><i className="fas fa-angle-right"></i></Button>
            </div>
            <div className='center-toolbar'>
                <Button className='btn-icon-only'><i className="fas fa-search-minus"></i></Button>
                <select>
                    <option value={0.5}>50%</option>
                    <option value={0.75}>75%</option>
                    <option value={1}>100%</option>
                    <option value={1.5}>150%</option>
                    <option value={2}>200%</option>
                    <option value={2.5}>250%</option>
                </select>
                <Button className='btn-icon-only'><i className="fas fa-search-plus"></i></Button>
            </div>
            <div className='right-toolbar'>
                <Button className='btn-icon-only'><i className="fas fa-adjust"></i></Button>
                <Button className='btn-icon-only' onClick={toogleFullscreen}><i className="fas fa-expand"></i></Button>
                <Button className='btn-icon-only'><i className="fas fa-bars"></i></Button>
                <Button className='btn-icon-only'><i className="fas fa-book"></i></Button>
            </div>
        </div>
    )
}

export default Toolbar