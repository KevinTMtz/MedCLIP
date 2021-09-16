import React from 'react';
import { MouseEvent, useState } from 'react';
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
import { styles } from './styles';
import CreateCase from './containers/cases/CreateCase';
import ReviewDiagnostic from './containers/diagnostics/ReviewDiagnostic';
import EditCase from './containers/cases/EditCase';
import ViewDiagnostic from './containers/diagnostics/ViewDiagnostic';

const appBarStyles = makeStyles((_: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

const App = () => {
  const classesAppBar = appBarStyles();
  const classes = styles();

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
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography
            className={classesAppBar.title}
            variant='h6'
            color='inherit'
          >
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

      <div className={classes.rootDiv}>
        <Switch>
          <Route exact path='/'>
            <Landingpage />
          </Route>
          <Route exact path='/home'>
            <Homepage />
          </Route>
          <Route exact path='/create-case'>
            <CreateCase />
          </Route>
          <Route exact path='/edit-case'>
            <EditCase />
          </Route>
          <Route path='/diagnostic'>
            <ViewDiagnostic />
          </Route>
          <Route path='/review-diagnostic'>
            <ReviewDiagnostic />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
