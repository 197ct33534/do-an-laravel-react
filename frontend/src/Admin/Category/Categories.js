import { Box } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import Category from './Category';
import FormMenu from './FormMenu';

const Categories = ({ list }) => {
    const [openForm, setOpenForm] = useState(false);

    const [menu, setMenu] = useState(null);
    const handleEditCate = (cate) => {
        setMenu({
            id: cate.id,
            category_name: cate.name,
            parent_id: cate.parent_id,
        });

        setOpenForm(true);
    };
    return (
        <>
            <Box>
                {list?.length > 0 &&
                    list.map((item, key) => (
                        <Box py={1} ml={item?.children ? 5 : 0} key={key}>
                            <Category cate={item} handleEditCate={handleEditCate} />
                        </Box>
                    ))}
            </Box>
            <FormMenu
                open={openForm}
                handleClose={() => {
                    setOpenForm(false);
                }}
                row={menu}
            />
        </>
    );
};

export default Categories;
