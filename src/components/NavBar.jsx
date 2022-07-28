import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@material-ui/icons";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import SearchIcon from '@mui/icons-material/Search';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import logo from "../assets/lahuella.png";
import { useAuth0 } from "@auth0/auth0-react";
import HomeIcon from "@mui/icons-material/Home";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ user, signOut }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { loginWithRedirect } = useAuth0();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex", backgroundColor: "#f12eaf" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#f12eaf" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user ? `Lic. ${user.name}` : "Equipo SAIE"}
          </Typography>
          <img src={logo} alt="Logo" height={70} />

          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <></>
            // <Tooltip title="Ingresar">
            //   <IconButton
            //     size="large"
            //     aria-label="login"
            //     aria-controls="menu-appbar"
            //     aria-haspopup="true"
            //     onClick={loginWithRedirect}
            //     color="inherit"
            //   >
            //     <LoginIcon />
            //   </IconButton>
            // </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#f12eaf",
            color: "white",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button key={"home"} onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Inicio"} />
          </ListItem>
          <ListItem
            button
            key={"students"}
            onClick={() => navigate("/students")}
          >
            <ListItemIcon>
              <ChildCareIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Alumnos"} />
          </ListItem>
          <ListItem
            button
            key={"acompañantes"}
            onClick={() => navigate("/personas")}
          >
            <ListItemIcon>
              <EscalatorWarningIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Acompañantes"} />
          </ListItem>
          <ListItem
            button
            key={"search"}
            onClick={() => navigate("/search")}
          >
            <ListItemIcon>
              <SearchIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Buscar"} />
          </ListItem>
          <ListItem
            button
            key={"bajas"}
            onClick={() => navigate("/studentsDown")}
          >
            <ListItemIcon>
              <PersonOffIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Bajas"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
