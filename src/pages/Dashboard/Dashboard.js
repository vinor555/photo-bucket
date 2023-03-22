import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext, useAuth } from "../../services/auth";
import { Card, CardMedia, Button, makeStyles, CardContent, Typography, Grid, TextField } from "@material-ui/core";
import messi from '../Dashboard/messi.jpg'
import {EditarUser} from '../EditarUser.js/EditarUser'
import SubirFoto from "../EditarUser.js/SubirFoto";
import EditarAlbum from "../EditarAlbumes/EditarAlbum";
import VerFotos from "../VerFotos/VerFotos";
import DetectarTexto from "../DetectarTexto/DetectarTexto";

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
  },
  input: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1)
  }
}))

function DashboardUser(props) {
  console.log(props);
  const {Usuario, Nombres, Contrasenia, Foto} = props.data;
  const classes = useStyles();
  const imgUrl = Foto;
  const { isAuthenticated } = useContext(AuthContext);
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

  /*useEffect(() => {
    console.log("estaAutenticado", isAuthenticated);
    if (!isAuthenticated) {
      window.location.href = "/login";
      return null;
    }
  }, [isAuthenticated]);*/

  return (
    <>
      {subirFoto ? (
        <SubirFoto data={props.data}/>
      ): editarAlbum ? (
        <EditarAlbum data={props.data} />
      ): verFotos ? (
        <VerFotos data={props.data} />
      ): detectarTexto ? (
        <DetectarTexto/>
      ):  (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="h3"
              gutterBottom
              color="blueGrey"
            >
              Datos Personales
            </Typography>
          </CardContent>
          <CardMedia>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center">
              <img src={messi} style={{maxWidth: 200, maxHeight: 200, objectFit: "scale-down"}}/>
            </Grid>
          </CardMedia>
          <CardContent>
            <Typography variant="h7" gutterBottom>
              Hombre 22-23 años Feliz
              Usa lentes Tiene barba
            </Typography>
          </CardContent>
          <CardContent>
            <p>Nombre de Usuario</p>
            <TextField
              defaultValue="Usuario 2"
              InputProps={{
                readOnly: true,
              }}
              />
          </CardContent>



          <CardContent>
          <Button className={classes.input}
            variant="contained"
            color="primary"
          >
            Ver Fotos
          </Button>
          <Button className={classes.input}
            variant="contained"
            color="primary">
              Subir Foto
          </Button>
          <Button className={classes.input}
            variant="contained"
            color="primary"
          >Editar Perfil
          </Button>
          <Button className={classes.input}
            variant="contained"
            color="primary"
          >
            Extraer Texto
          </Button>
          <Button className={classes.input}
            variant="contained"
            color="primary"
          >Cerrar Sesion</Button>
          </CardContent>

          
        </Card>

      </div>
      )}
    </>
  )

}

export default DashboardUser;
