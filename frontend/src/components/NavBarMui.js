import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAsync } from "../features/user/userSlice";
import { checkPermission } from "../Helper/Permission";
const NavBarMui = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
    setAnchorEl(null);
    await dispatch(logoutAsync());
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = [
    { title: "Sản phẩm", link: "/manager/product", permission: "read product" },
    { title: "Tài khoản", link: "/manager/user", permission: "" },
    { title: "Nhóm", link: "/manager/role", permission: "" },
    { title: "Quyền", link: "/manager/permission", permission: "" },
    { title: "Thương hiệu", link: "/manager/brand", permission: "" },
    { title: "Menu", link: "/manager/menu", permission: "" },
  ];
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoDevIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },

              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Quản lý
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={
                checkPermission("read product") || checkPermission()
                  ? Boolean(anchorElNav)
                  : false
              }
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(
                (page, key) =>
                  checkPermission(page.permission) && (
                    <MenuItem key={key} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <NavLink
                          to={page.link}
                          style={({ isActive }) =>
                            isActive
                              ? {
                                  color: "red",
                                  textDecoration: "none",
                                }
                              : {
                                  color: "black",
                                  textDecoration: "none",
                                }
                          }
                        >
                          <span>{page.title}</span>
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          {/* medium left */}
          <LogoDevIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,

              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Quản lý
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(
              (page, key) =>
                checkPermission(page.permission) && (
                  <NavLink
                    key={page.title}
                    to={page.link}
                    color="inherit"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: "black",
                            textDecoration: "none",
                            display: "block",
                            margin: "0 8px",
                          }
                        : {
                            color: "white",
                            textDecoration: "none",
                            display: "block",
                            margin: "0 8px",
                          }
                    }
                  >
                    <span>{page.title}</span>
                  </NavLink>
                )
            )}
          </Box>

          {/* right */}
          <Box sx={{ flexGrow: 0, marginRight: { xs: "0px", md: "24px" } }}>
            <Button
              color="inherit"
              id="Admin-menu"
              aria-controls={open ? "Admin-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleClick}
            >
              {JSON.parse(localStorage.getItem("userInfo")).name}
            </Button>
            <Menu
              id="Admin-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => {
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              MenuListProps={{
                "aria-labelledby": "resources-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBarMui;
