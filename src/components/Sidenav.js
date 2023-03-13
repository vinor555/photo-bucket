import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import User from "../pages/User/User";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function SideNav(props) {
  const classes = useStyles();

  const handleDashboardClick = () => {
    props.handleDashboardClick();
    props.handleClose();
  };

  const handleOrdersClick = () => {
    props.handleOrdersClick();
    props.handleClose();
  };

  const handleCustomersClick = () => {
    props.handleCustomersClick();
    props.handleClose();
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.handleClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={handleDashboardClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Pagina Inicio" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideNav;
