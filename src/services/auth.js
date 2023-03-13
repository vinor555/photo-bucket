import { createContext, useContext, useState } from "react";

// Creamos un contexto para compartir los datos de autenticación
export const AuthContext = createContext({});

// Este componente proporciona el contexto de autenticación
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    console.log("entrando a login");
    // aquí implementas la lógica de autenticación, por ejemplo:
    // 1. validar credenciales
    // 2. si son correctas, establecer isAuthenticated a true
    // 3. si son incorrectas, mostrar un mensaje de error
    setIsAuthenticated(true);
  };

  const logout = () => {
    // aquí implementas la lógica para cerrar sesión, por ejemplo:
    // 1. eliminar token de autenticación
    // 2. establecer isAuthenticated a false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Este hook permite acceder al contexto de autenticación desde cualquier componente
export function useAuth() {
  return useContext(AuthContext);
}
