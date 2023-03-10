import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import {
    FaUser,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaTachometerAlt,
    FaGem,
    FaList,
    FaRegLaughWink,
    FaHeart,
    FaSignOutAlt,
    FaChartBar,
    FaUserAlt,
    FaFolder,
    FaProductHunt,
} from 'react-icons/fa';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../features/user/userSlice';

const Sidebar = ({ image, collapsed, toggled, handleToggleSidebar, handleCollapsedChange }) => {
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
            image={image ? process.env.PUBLIC_URL + '/assets/images/bg1.jpg' : false}
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
                                Ngh??a Store
                            </div>
                        </MenuItem>
                    )}
                </Menu>
            </SidebarHeader>
            {/* Content */}
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<FaChartBar />} suffix={<span className="badge red">NEW</span>}>
                        T???ng quan
                        <NavLink to="/" />
                    </MenuItem>
                    {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
                    <MenuItem icon={<FaHeart />}>
                        Th????ng hi???u <Link to="brands" />
                    </MenuItem>
                    <MenuItem icon={<FaFolder />}>
                        M???t h??ng <Link to="categories" />
                    </MenuItem>
                    <MenuItem icon={<FaUserAlt />}>
                        T??i kho???n <Link to="users" />
                    </MenuItem>
                    <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title={'S???n ph???m'}
                        icon={<FaProductHunt />}
                    >
                        <MenuItem>
                            Th??m s???n ph???m <Link to="products/add" />
                        </MenuItem>
                        <MenuItem>
                            Danh s??ch s???n ph???m <Link to="products" />
                        </MenuItem>
                        <SubMenu title={'Thu???c t??nh'}>
                            <MenuItem>
                                Nh??m thu???c t??nh <Link to="attribute/sets" />
                            </MenuItem>
                            <MenuItem>
                                Thu???c t??nh <Link to="attribute/values" />
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu
                        prefix={<span className="badge gray">3</span>}
                        title={'With Prefix'}
                        icon={<FaHeart />}
                    >
                        <MenuItem>Submenu 1</MenuItem>
                        <MenuItem>Submenu 2</MenuItem>
                        <MenuItem>Submenu 3</MenuItem>
                    </SubMenu>
                    <SubMenu title={'Ph??n quy???n'} icon={<FaList />}>
                        <MenuItem>
                            Nh??m <Link to="roles" />
                        </MenuItem>
                        <MenuItem>
                            Quy???n <Link to="permissions" />
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
                    <Button color="warning" variant="outlined" onClick={handleLogout}>
                        <FaSignOutAlt />
                    </Button>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
