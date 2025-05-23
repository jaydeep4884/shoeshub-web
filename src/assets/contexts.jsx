import { createContext, useState } from "react";

export const token = createContext("4aMp3nobXg24Lqun");

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
