import React from 'react';
import { MouseEvent, useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router';
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
import axios from 'axios';

import Homepage from './containers/Homepage';
import Landingpage from './containers/Landingpage';
import { styles } from './styles';
import CreateCase from './containers/cases/CreateCase';
import ReviewDiagnostic from './containers/diagnostics/ReviewDiagnostic';
import EditCase from './containers/cases/EditCase';
import Loginpage from './containers/auth/Loginpage';
import Registerpage from './containers/auth/Registerpage';
import { UserContextProvider } from './contexts/user';
import ViewDiagnostic from './containers/diagnostics/ViewDiagnostic';
import ManageDiagnostic from './containers/diagnostics/ManageDiagnostic';
import AccountPage from './containers/account/AccountPage';

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

  const history = useHistory();

  const [auth, setAuth] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Check if cookie exist
    if (document.cookie.indexOf('existToken') >= 0) {
      login();
    }
    // Else redirect logout to erase token cookie
    else {
      logout();
    }

    // eslint-disable-next-line
  }, []);

  const login = () => {
    setAuth(true);
    if (
      location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/register'
    )
      history.push('/home');
  };

  const logout = () => {
    //TODO: change all req paths to a variable
    axios('http://localhost:3001/auth/logout', {
      method: 'POST',
      responseType: 'json',
      withCredentials: true,
    }).then(
      () => {},
      (error) => {
        if (error.response!.status === 401)
          console.log('Token not available or expired');
        else console.log(error);
      },
    );
    setAuth(false);
    if (
      location.pathname !== '/' &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    )
      history.push('/login');
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let userContextValue = {
    login,
    logout,
  };

  return (
    <div>
      <UserContextProvider value={userContextValue}>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <Typography
              className={classesAppBar.title}
              variant='h6'
              color='inherit'
            >
              MedCLIP
            </Typography>
            {auth ? (
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
                  <MenuItem
                    onClick={() => {
                      history.push('/my-account');
                      handleClose();
                    }}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color='inherit' onClick={() => history.push('/login')}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/'>
            <Landingpage />
          </Route>
          <div className={classes.layoutDiv}>
            <Route exact path='/login'>
              <Loginpage />
            </Route>
            <Route exact path='/register'>
              <Registerpage />
            </Route>
            <Route exact path='/home'>
              <Homepage />
            </Route>

            {/* Cases */}
            <Route exact path='/create-case'>
              <CreateCase />
            </Route>
            <Route exact path='/edit-case'>
              <EditCase />
            </Route>

            {/* Diagnostics */}
            <Route path='/diagnostic'>
              <ViewDiagnostic />
            </Route>
            <Route path='/manage-diagnostic'>
              <ManageDiagnostic />
            </Route>
            <Route path='/review-diagnostic'>
              <ReviewDiagnostic />
            </Route>
            <Route path='/my-account'>
              <AccountPage />
            </Route>
          </div>
        </Switch>
      </UserContextProvider>
    </div>
  );
};

export default App;
