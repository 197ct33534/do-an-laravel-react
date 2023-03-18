import { Button } from '@mui/material';
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaChartBar,
    FaFolder,
    FaHeart,
    FaList,
    FaMoneyBillAlt,
    FaProductHunt,
    FaSignOutAlt,
    FaUserAlt,
} from 'react-icons/fa';
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SubMenu,
} from 'react-pro-sidebar';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logoutAsync } from '../features/user/userSlice';

const Sidebar = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await dispatch(logoutAsync());
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        navigate('/login');
    };
    return (
        <ProSidebar
            // image={image ? process.env.PUBLIC_URL + '/assets/images/bg1.jpg' : false}
            collapsed={collapsed}
            toggled={toggled}
            onToggle={handleToggleSidebar}
            breakPoint="md"
        >
            {/* Header */}
            <SidebarHeader>
                <Menu iconShape="circle">
                    {collapsed ? (
                        <MenuItem
                            icon={<FaAngleDoubleRight />}
                            onClick={handleCollapsedChange}
                        ></MenuItem>
                    ) : (
                        <MenuItem suffix={<FaAngleDoubleLeft />} onClick={handleCollapsedChange}>
                            <div
                                style={{
                                    padding: '9px',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    letterSpacing: '1px',
                                }}
                            >
                                Nghĩa Store
                            </div>
                        </MenuItem>
                    )}
                </Menu>
            </SidebarHeader>
            {/* Content */}
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaChartBar />}
                        suffix={<span className="badge pink">NEW</span>}
                    >
                        Tổng quan
                        <NavLink to="/" />
                    </MenuItem>
                    {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
                    <MenuItem icon={<FaHeart />}>
                        Thương hiệu <Link to="brands" />
                    </MenuItem>
                    <MenuItem icon={<FaFolder />}>
                        Mặt hàng <Link to="categories" />
                    </MenuItem>
                    <MenuItem icon={<FaUserAlt />}>
                        Tài khoản <Link to="users" />
                    </MenuItem>
                    <SubMenu title={'Sản phẩm'} icon={<FaProductHunt />}>
                        <MenuItem>
                            Thêm sản phẩm <Link to="products/add" />
                        </MenuItem>
                        <MenuItem>
                            Danh sách sản phẩm <Link to="products" />
                        </MenuItem>
                        <SubMenu title={'Thuộc tính'}>
                            <MenuItem>
                                Nhóm thuộc tính <Link to="attribute/sets" />
                            </MenuItem>
                            <MenuItem>
                                Thuộc tính <Link to="attribute/values" />
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu
                        // prefix={<span className="badge gray">3</span>}
                        suffix={<span className="badge red">3</span>}
                        title={'Đơn hàng'}
                        icon={<FaMoneyBillAlt />}
                    >
                        <MenuItem>
                            Danh sách đơn hàng <Link to="orders" />
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title={'Phân quyền'} icon={<FaList />}>
                        <MenuItem>
                            Nhóm <Link to="roles" />
                        </MenuItem>
                        <MenuItem>
                            Quyền <Link to="permissions" />
                        </MenuItem>
                        <SubMenu title={'Submenu 3'}>
                            <MenuItem>Submenu 3.1 </MenuItem>
                            <MenuItem>Submenu 3.2 </MenuItem>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            {/* Footer */}
            <SidebarFooter style={{ textAlign: 'center' }}>
                <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
                    <Button color="warning" variant="outlined" onClick={() => handleLogout()}>
                        <FaSignOutAlt />
                    </Button>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
