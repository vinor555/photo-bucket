import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import VerFotos from "../VerFotos/VerFotos";
import { useAuth } from "../../services/auth";
import axios from "axios";
import User from "../User/User";
import { API_URL } from "../../utils/Constants";
import Gallery from '../ImageList/Gallery'

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

function Foto(props) {
  const {Foto, Nombre, Descri } = props.data;
  const classes = useStyles();
  const imgUrl = Foto;
  const input1 = "Input 1";
  const input2 = "Input 2";
  const [verFotos, setVerFotos] = useState(false);


  const handleVerFotos = () => {
    setVerFotos(true);
  };


  return (
    <>
      { verFotos ? (
        <Gallery />
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
                
                multiline
                value={Nombre}
                className={classes.input}
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
                id="Descrip"
                label="Descripcion"
                value={Descri}
                className={classes.input}
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
                onClick={handleVerFotos}
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

