import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext, useAuth } from "../../services/auth";

function Dashboard(props) {
  console.log(props);
  const { isAuthenticated } = useContext(AuthContext);

  /*useEffect(() => {
    console.log("estaAutenticado", isAuthenticated);
    if (!isAuthenticated) {
      window.location.href = "/login";
      return null;
    }
  }, [isAuthenticated]);*/

  return <h1>Pagina de inicio</h1>;
}

export default Dashboard;
