import React from 'react';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserContext {
  user: IUser | undefined;
  token: string | undefined;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

const UserContext = React.createContext<IUserContext>({
  user: undefined,
  token: undefined,
  login: (user: IUser, token: string) => {},
  logout: () => {},
});

export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;
export default UserContext;
