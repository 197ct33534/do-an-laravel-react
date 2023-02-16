import React from 'react';
import { useSelector } from 'react-redux';
import { categoryList } from '../../features/shopSlice';
import MenuItems from './MenuItems';

const ListMenu = () => {
    const categories = useSelector(categoryList);

    return (
        <ul className="menus">
            {categories.map((menu, index) => {
                const depthLevel = 0;
                return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
            })}
        </ul>
    );
};

export default ListMenu;
