import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
