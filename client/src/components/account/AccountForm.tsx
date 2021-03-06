import React from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  makeStyles,
  createStyles,
  TextField,
  Theme,
  Container,
  Typography,
} from '@material-ui/core';

import { styles } from '../../styles';

const formStyles = makeStyles((_: Theme) =>
  createStyles({
    centerForm: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '40%',
      '@media (max-width: 1000px)': {
        width: '60%',
      },
      '@media (max-width: 600px)': {
        width: '80%',
      },
    },
  }),
);

interface AccountFormProps {
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmation: string;
  setConfirmation: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  delete: () => Promise<void>;
  update: () => Promise<void>;
}

const AccountForm: React.FC<AccountFormProps> = (props: AccountFormProps) => {
  const classes = styles();
  const formClasses = formStyles();

  const history = useHistory();

  return (
    <Container className={formClasses.centerForm}>
      <header>
        <Typography variant='h4' align='center' style={{ margin: '15px auto' }}>
          My account
        </Typography>
      </header>
      <form className={classes.displayRows}>
        <TextField
          variant='outlined'
          label='Name:'
          onChange={(event) => {
            props.setName(event.target.value);
          }}
          disabled={props.disabled}
          value={props.name}
        />
        <TextField
          variant='outlined'
          label='E-mail:'
          onChange={(event) => props.setEmail(event.target.value)}
          type='email'
          disabled={props.disabled}
          value={props.email}
        />
        {!props.disabled && (
          <>
            <TextField
              variant='outlined'
              label='Password:'
              onChange={(event) => props.setPassword(event.target.value)}
              type='password'
              disabled={props.disabled}
            />
            <TextField
              type='password'
              variant='outlined'
              label='Repeat password:'
              onChange={(event) => {
                props.setConfirmation(event.target.value);
              }}
              disabled={props.disabled}
            />
          </>
        )}
        <div className={classes.displayRowsButtons}>
          {props.disabled ? (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={() => props.setDisabled(false)}
              >
                Edit
              </Button>
              <Button variant='contained' onClick={() => history.push('/home')}>
                Return home
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={() => props.update()}
              >
                Update my account
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => {
                  props.setDisabled(true);
                  props.delete();
                }}
              >
                Delete my account
              </Button>
              <Button
                variant='outlined'
                onClick={() => {
                  props.setDisabled(true);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </form>
    </Container>
  );
};

export default AccountForm;
