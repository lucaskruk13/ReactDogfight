import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DogfightList from "./DogfightList";
import AddDogfight from "./AddDogfight";
import NewDogfight from "./NewDogfight";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "red",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = useState([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const links = [
    { text: "Dogfight", link: "/" },
    { text: "Add Dogfight", link: "/addDogfight" },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="menu"
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dogfight
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <Drawer
          open={!open}
          className={classes.drawer}
          ModalProps={{ onBackdropClick: handleToggle }}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <List>
              {links.map((link) => (
                <ListItem
                  button
                  component={Link} // Look into Prop Forwarding
                  to={link.link}
                  onClick={handleToggle}
                  key={link.text}
                >
                  <ListItemText primary={link.text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>

        <main className={classes.content}>
          {/* A <Switch> looks through all its children <Route>
             elements and renders the first one whose path
             matches the current URL. Use a <Switch> any time
             you have multiple routes, but you want only one
             of them to render at a time */}
          <Toolbar />
          <Switch>
            <Route exact path="/">
              <DogfightList />
            </Route>
            <Route path="/addDogfight">
              <AddDogfight />
            </Route>
            <Route path={"/dogfight"} component={NewDogfight} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
