import React from 'react';
import { MouseEvent, useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
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
import { IUser } from './contexts/user';
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

  const [user, setUser] = useState<IUser | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [auth, setAuth] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (user === undefined || token === undefined) {
      let _token = localStorage.getItem('token');
      let _user = localStorage.getItem('user');

      if (_token === null || _user === null) {
        logout();
        history.push('/');
      } else {
        validateJWT(_user, _token);
      }
    }
    // eslint-disable-next-line
  }, []);

  const validateJWT = async (_user: string, _token: string) => {
    const _userJSON = JSON.parse(_user);
    await axios('http://localhost:3001/auth/validate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    }).then(
      (res) => {
        login(_userJSON, _token);
      },
      (error) => {
        logout();
      },
    );
  };

  const login = (_user: IUser, _token: string) => {
    setUser(_user);
    setToken(_token);
    setAuth(true);

    localStorage.setItem('user', JSON.stringify(_user));
    localStorage.setItem('token', _token);

    history.push('/home');
  };

  const logout = () => {
    setUser(undefined);
    setToken(undefined);
    setAuth(false);

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    history.push('/');
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let userContextValue = {
    user,
    token,
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
