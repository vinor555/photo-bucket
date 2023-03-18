import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EditarUser from "../EditarUser.js/EditarUser";
import Typography from "@material-ui/core/Typography";
import SubirFoto from "../EditarUser.js/SubirFoto";
import EditarAlbum from "../EditarAlbumes/EditarAlbum";
import VerFotos from "../VerFotos/VerFotos";
import DetectarTexto from '../DetectarTexto/DetectarTexto'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    border: "none",
    boxShadow: "none",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  spacer: {
    height: theme.spacing(4),
  },
}));

function User(props) {
  const { Usuario, Nombres, Contrasenia, Foto } = props.data;
  const classes = useStyles();
  const imgUrl = Foto;
  const input1 = "Input 1";
  const input2 = "Input 2";
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [subirFoto, setSubirFoto] = useState(false);
  const [editarAlbum, setEditarAlbum] = useState(false);
  const [verFotos, setVerFotos] = useState(false);
  const [detectarTexto, setDetectarTexto] = useState(false);

  const handleEditarPerfil = () => {
    setEditarPerfil(true);
  };

  const handleSubirFoto = () => {
    setSubirFoto(true);
  };

  const handleEditarAlbum = () => {
    setEditarAlbum(true);
  };

  const handleVerFotos = () => {
    setVerFotos(true);
  };

  const handleDetectarTexto = () => {
    setDetectarTexto(true);
  }

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <>
      {editarPerfil ? (
        <EditarUser data={props.data} />
      ) : subirFoto ? (
        <SubirFoto data={props.data} />
      ) : editarAlbum ? (
        <EditarAlbum data={props.data} />
      ) : verFotos ? (
        <VerFotos data={props.data} />
      ) : detectarTexto ? (
        <DetectarTexto />
      ) : (
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Datos Personales
              </Typography>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={imgUrl}
                    alt="Imagen"
                    style={{ maxWidth: 200, maxHeight: 200 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleVerFotos}
                  >
                    Ver fotos
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={classes.form}>
                    <TextField
                      label="Nombre de usuario"
                      value={Usuario}
                      disabled
                      className={classes.input}
                    />
                    <TextField
                      label="Nombre Completo"
                      value={Nombres}
                      disabled
                      className={classes.input}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleSubirFoto}
                    >
                      Subir Foto
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleEditarPerfil}
                      >
                        Editar perfil
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleEditarAlbum}
                      >
                        Editar albumes
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleDetectarTexto}
                      >
                        Detectar Texto
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <div className={classes.spacer}></div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default User;
