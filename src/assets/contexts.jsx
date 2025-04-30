// assets/contexts.js
import { createContext, useEffect, useState } from "react";

export const token = createContext(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Zjc1YTc3YmYzMzczMGY5NjI0ZTFmMiIsImlhdCI6MTc0NDI2Mzc5OX0.1TIh6YZqgiekXJZ_qzns74n2HCIqD57idf1bJ_5rFZQ"
);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [authToken]);

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
