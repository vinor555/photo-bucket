import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../services/auth";
import axios from "axios";
import User from "../User/User";
import { API_URL } from "../../utils/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    width: "400px",
    height: "fit-content",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const { isAuthenticated, login } = useAuth();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState();

  const handleLogin = () => {
    loginUser();
  };

  function loginUser() {
    const body = {
      user: email,
      password: password,
    };
    axios
      .post(`${API_URL}/users/login`, body)
      .then((response) => {
        if (response.data.msg === "Logged in!") {
          setData(response.data.user);
          setAuth(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (isAuthenticated) {
    console.log(isAuthenticated);
    // Redirigir a otra página si ya se ha autenticado
    window.location.href = "/";
  }

  return (
    <>
      {auth ? (
        <User data={data} />
      ) : (
        <div className={classes.root}>
          <Paper elevation={3} className={classes.paper}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>

              <Link to="/register" className={classes.link}>
                ¿No tienes una cuenta? Regístrate aquí
              </Link>
            </form>
          </Paper>
        </div>
      )}
    </>
  );
}

export default Login;
