import React, { useEffect } from 'react';
import { Button, Form, InputNumber, Select } from 'antd';
import {DataContext} from './';
/*eslint-disable*/ 
const Toolbar = (props) => {
    const {totalPage, current} = props;
    const { book, setBook, option, setOption} = React.useContext(DataContext);
    const [form] = Form.useForm();
    const gotoPage = (e) => {
        const idx = e.target.value;
        if(idx && idx >= 1 &&  idx <= totalPage){
            if(option.mode === 'scroll'){
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

    const changeTheme = () => {
        const inContainer = document.getElementById('inner-container');
        inContainer.classList.toggle('dark');
    }

    const handleScale = (value) => {
        setOption(prev=>({...prev, scale:value}))
    }

    const toggleBookmark = () => {
        setOption(prev=>({...prev, showBookmark:!option.showBookmark}))
    }
    
    useEffect(()=>{
        form.setFieldsValue({page:current});
    },[current])

    return (
        <div className='toolbar-inner-container'>
            <div className='left-toolbar'>
                <Button className='btn-icon-only' onClick={toggleBookmark}>
                    <i className="far fa-bookmark"></i>
                </Button>
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
                <span className='total-page'>/{totalPage}</span>
                <Button className='btn-icon-only' onClick={handleNext}><i className="fas fa-angle-right"></i></Button>
            </div>
            <div className='center-toolbar'>
                <Button className='btn-icon-only' onClick={()=>option.scale > 0.5 && handleScale(option.scale - 0.5)}>
                    <i className="fas fa-search-minus"></i>
                </Button>
                <Select value={option.scale} onChange={handleScale}>
                    <Select.Option value={0.5}>50%</Select.Option>
                    <Select.Option value={0.75}>75%</Select.Option>
                    <Select.Option value={1}>100%</Select.Option>
                    <Select.Option value={1.5}>150%</Select.Option>
                    <Select.Option value={2}>200%</Select.Option>
                    <Select.Option value={2.5}>250%</Select.Option>
                </Select>
                <Button className='btn-icon-only' onClick={()=>option.scale < 2.5 && handleScale(option.scale + 0.5)}>
                    <i className="fas fa-search-plus"></i>
                </Button>
            </div>
            <div className='right-toolbar'>
                <Button 
                    className='btn-icon-only'
                    onClick={changeTheme}
                >
                    <i className="fas fa-adjust"></i>
                </Button>
                <Button className='btn-icon-only' onClick={toogleFullscreen}><i className="fas fa-expand"></i></Button>
                <Button 
                    className='btn-icon-only' 
                    disabled={option.mode === 'scroll'}
                    onClick={()=>setOption(prev=>({...prev,mode:'scroll'}))}
                >
                    <i className="fas fa-bars"></i>
                </Button>
                <Button 
                    className='btn-icon-only'
                    disabled={option.mode === 'flip'}
                    onClick={()=>setOption(prev=>({...prev,mode:'flip'}))}
                >
                    <i className="fas fa-book"></i>
                </Button>
            </div>
        </div>
    )
}

export default Toolbar