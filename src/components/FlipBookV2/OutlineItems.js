import React, { useEffect, useState } from 'react';
import {Menu} from 'antd'
import {DataContext} from './';
import Ref from './utils/Refs';
/*eslint-disable*/ 
const OutlineItems = ({onClickItem}) => {
  const {book, option} = React.useContext(DataContext);
  const [outline,setOutline] = useState([]);

  const setMenuItem = (menu, idx) => {
    const menuItem = {
      label: menu.title, 
      key: `item-${idx}`,
      info:menu
    };
    if(menu.items && menu.items.length > 0){
      menuItem.children = []
      menu.items.forEach((item,i) => {
        const childMenu = setMenuItem(item,`${idx}-${i}`);
        menuItem.children.push(childMenu)
      })

    }

    return menuItem;
  }

  const getDestination = (props) => new Promise((resolve, reject) => {
    const { item } = props;
    if (typeof item.dest === 'string') {
      book.pdf.getDestination(item.dest)
        .then(resolve)
        .catch(reject);
    } else {
      resolve(item.dest);
    }
  }).then((destination) => {
    return destination;
  })


  const getPageIndex = ({item}) => new Promise((resolve, reject) => {
    getDestination({item})
    .then((destination) => {
      if (!destination) {
        return;
      }
      const [ref] = destination;
      book.pdf.getPageIndex(new Ref(ref)).then(resolve).catch(reject);
    });
  }).then((pageIndex) => {
      return pageIndex;
  })

  const getPageNumber = ({item}) => new Promise((resolve, reject) => {
    getPageIndex({item}).then((pageIndex) => {
        resolve(pageIndex + 1);
    }).catch(reject);
  }).then((pageNumber) => {
    return pageNumber;
  })

  const handleClick = ({item}) => {
    if (!onClickItem) {
      return false;
    }

    return Promise.all([getPageIndex({item:item.props.info}), getPageNumber({item:item.props.info})])
      .then(([pageIndex, pageNumber]) => {
        onClickItem({
          pageIndex,
          pageNumber,
        });
    });
  }

  useEffect(()=>{
    if(book.outline){
      let menus = []
      book.outline.forEach((m,idx) => {
        const item = setMenuItem(m,idx);
        menus.push(item)
      })
      setOutline(menus)
    }
  },[book.outline])

  return (
    <div className={`outline-container ${option.showBookmark && 'show'}`}>
      <div className='outline-inner-container'>
        <Menu items={outline} mode="inline" onClick={handleClick}/>
      </div>
    </div>
  )
}

export default OutlineItems