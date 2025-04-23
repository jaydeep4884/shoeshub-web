import { createContext, useState } from "react";

export const token = createContext(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Zjc1YTc3YmYzMzczMGY5NjI0ZTFmMiIsImlhdCI6MTc0NDI2Mzc5OX0.1TIh6YZqgiekXJZ_qzns74n2HCIqD57idf1bJ_5rFZQ"
);

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
