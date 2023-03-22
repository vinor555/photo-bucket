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
  paper2: {
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

function Foto() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState();

  const imgUrl = "appa.jpg";

 /* const handleBack = () => {

  };*/


  return (
    <>
      {auth ? (
        <User data={data} />
      ) : (
        <div className={classes.root}>
          <Paper elevation={3} className={classes.paper}>
            <form className={classes.form} noValidate>
              <img
                src={imgUrl}
                alt="Imagen"
                style={{ maxWidth: 200, maxHeight: 200 }}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                readonly
                multiline
                value="Nombre Foto"
                name="name"
                label="Nombre"
                id="name"
              />

            </form>

          </Paper>

          <Paper elevation={3} className={classes.paper2}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                readonly
                id="Descrip"
                label="Descripcion"
                value="Datos de la Descripcion"
                name="Descrip"
              />
              <div>Opciones:</div>
              <select name="opcion" id="opcion">
                <option value="Idioma1">Idioma1</option>
                <option value="Idioma2">Idioma2</option>
                <option value="Idioma3">Idioma3</option>
              </select>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                readonly
                multiline
                value="Datos de la Traduccion"
                name="Trad"
                label="Traduccion"
                id="Trad"
              />
              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
               // onClick={handleBack}
              >
                Regresar
              </Button>
            </form>

          </Paper>
        </div>

      )}
    </>

  );
}

export default Foto;

