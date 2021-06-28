import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { postData, getData, ServerURL } from "../FetchNodeServices";
import LocationOnIcon from "@material-ui/icons/LocationOn";



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      color:"#FFF",
      
    },
  },
  search: {
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.6),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(135),
      width: "auto",
      color:'#000',
      display:'flex',
      
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft:120
    
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  cursor: {
    cursor:'pointer',
  },
  LocationIcon: {
    padding: theme.spacing(0, 4),
     color:'#000',
    //position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7bed9f",
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [listCategory, setListCategory] = useState([]);
  const [listSubCategory, setListSubCategory] = useState([]);
  const [anchorMEl, setAnchorMEl] = React.useState(null);
   
  /////////////////////Menu Design////////////////////////
 
  ////////////////////////////////////////////////////////

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const handleHome=()=>{

    props.history.push({'pathname':'/home'})
   }
const handlegallery=()=>{
  props.history.push({'pathname':'/showgallery'})

}
  
const handlecontact=()=>{
  props.history.push({'pathname':'/contact'})

}

const handleabout=()=>{
  props.history.push({'pathname':'/abouts'})

}
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' style={{background:'#fff',color:'#fff',}}>
        <Toolbar>
            {/* <img src="/logo1.png" /> */}
          <Typography className={classes.title} variant="h5" noWrap >
            
            <div style={{color:'#000'}}>
            <b className={classes.cursor} style={{fontSize:21,fontFamily:'serif', fontWeight:'bolder'}}>Ek <img  onClick={()=>handleHome()} src="/health.jpg" style={{width:25, height:25 ,margin:0}} /> UMEED</b> <span style={{color:'#000', fontSize:12,fontFamily: " serif, papyrus"}}>दूसरों की खुशी के लिए।</span>
   
         
          <span style={{color:'#000',marginLeft:520}}>
           
            <span className={classes.cursor} onClick={()=>handleHome()} style={{padding:10,fontSize:18,fontFamily:'serif', fontWeight:'bolder',color:'#000'}}>Home</span>
            <span className={classes.cursor} onClick={()=>handlegallery()} style={{padding:10,fontSize:18,fontFamily:'serif', fontWeight:'bolder',color:'#000'}}>Gallery</span>
            <span className={classes.cursor} onClick={()=>handlecontact()} style={{padding:10,fontSize:18,fontFamily:'serif', fontWeight:'bolder',color:'#000'}}>Contact us</span>
            <span className={classes.cursor}onClick={()=>handleabout()} style={{padding:10,fontSize:18,fontFamily:'serif', fontWeight:'bolder',color:'#000'}}>About</span>
            <Button variant="contained" style={{fontWeight:'bold',color:"#000"}}>Donation</Button>
            </span>
     </div>
     </Typography>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}