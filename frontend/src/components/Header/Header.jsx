import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  ShoppingBag as ProductsIcon,
  ExitToApp as LogoutIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
} from "@mui/icons-material";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usrlogo from "../../assets/images/user.png";
import { logout } from "../../store/actions/userActions";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../store/selectors/userSelectors";
import "./Header.scss";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const favoriteItems = useSelector((state) => state.favorites.items);
  const favoriteCount = favoriteItems.length;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      handleUserMenuClose();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFavoriteClick = () => {
    navigate("/favorite");
  };

  const handleNavigationClick = (path) => {
    handleUserMenuClose();
    navigate(path);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Products", path: "/products", icon: <ProductsIcon /> },
    { label: "Categories", path: "/categories", icon: <CategoryIcon /> },
    { label: "About Us", path: "/about", icon: <InfoIcon /> },
    { label: "Contact Us", path: "/contact", icon: <ContactMailIcon /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box className="mobile-drawer">
      <Box className="drawer-header">
        <Typography variant="h6" className="drawer-title">
          ZonShop
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            <ListItem
              onClick={() => handleNavigationClick("/profile")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem onClick={handleLogout} sx={{ cursor: "pointer" }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              onClick={() => handleNavigationClick("/login")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
            <ListItem
              onClick={() => handleNavigationClick("/signup")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        className="app-bar"
        sx={{
          width: "100%",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: "100%",
            padding: { xs: "0", sm: "0" },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            className="logo"
            sx={{
              textDecoration: "none",
              color: "inherit",
              flexShrink: 0,
              marginRight: { xs: 1, sm: 2 },
            }}
          >
            ZonShop
          </Typography>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className="mobile-menu-button"
              sx={{ marginRight: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              className="desktop-nav"
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: 2,
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  className={isActive(item.path) ? "active" : ""}
                  sx={{
                    minWidth: "auto",
                    padding: "6px 12px",
                    margin: "0 4px",
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Side Icons */}
          <Box
            className="right-icons"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
              marginLeft: "auto",
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              onClick={handleFavoriteClick}
              className="favorite-button"
              sx={{
                // padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Badge badgeContent={favoriteCount} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleUserMenuOpen}
              color="inherit"
              sx={{
                // padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isAuthenticated && user?.avatar ? (
                <Avatar
                  src={usrlogo}
                  alt="Z"
                  sx={{
                    width: 34,
                    height: 34,
                    border: "2px solid white",
                    objectFit: "cover",
                    bgcolor: "primary.main",
                  }}
                />
              ) : (
                <PersonIcon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className="mobile-drawer-container"
        PaperProps={{
          sx: {
            width: "250px",
            backgroundColor: "#ffffff",
            borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        className="profile-menu"
      >
        {isAuthenticated ? (
          <Box>
            <MenuItem onClick={() => handleNavigationClick("/profile")}>
              Profile
            </MenuItem>

            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={() => handleNavigationClick("/login")}>
              Sign In
            </MenuItem>
            <MenuItem onClick={() => handleNavigationClick("/signup")}>
              Sign Up
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default Header;
