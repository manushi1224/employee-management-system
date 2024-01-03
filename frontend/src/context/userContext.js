import { createContext } from "react";

const userContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  isSuperUser: false,
  currentUser: null,
  getUserData: () => {},
  login: () => {},
  logout: () => {},
  getLocalItem: () => {},
  setLocalItem: () => {},
});

export default userContext;
