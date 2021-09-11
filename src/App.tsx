import React, { MouseEvent, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
  IconButton,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import Homepage from './containers/Homepage';
import Landingpage from './containers/Landingpage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const App = () => {
  const classes = useStyles();

  // TODO: Check if auth
  const auth = false;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <div>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <Typography className={classes.title} variant='h6' color='inherit'>
              MedCLIP
            </Typography>
            {!auth && <Button color='inherit'>Login</Button>}
            {auth && (
              <div>
                <IconButton onClick={handleMenu} color='inherit'>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/home'>
            <Homepage />
          </Route>
          <Route exact path='/'>
            <Landingpage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
