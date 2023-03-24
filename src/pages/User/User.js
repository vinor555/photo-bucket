import React, { useEffect, useState } from "react";
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
import Gallery from '../ImageList/Gallery'
import axios from "axios";
import { API_URL } from "../../utils/Constants";
import { render } from "@testing-library/react";



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
  const [gallery, setGallery] = useState(false);
  const [etiquetas, setEtiquetas] = useState('');
  const [imagebase64, SetImageBase64] = useState('');
  const [labelTranslate, setLabelTranslate] = useState('')

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

  const handleGallery = () => {
    setGallery(true);
  }

  const getImageBase64 = async() => {
    const regex = /[^\/]+\.([a-zA-Z]+)$/;
    const match = Foto.match(regex)
    var filename = "";
    if (match) {
      filename = match[0];
    } else {
      console.log("La url no contiene una extension de archivo valia");
    }
    axios.post(`${API_URL}/images/downloadPerfil`, {
      pathname: filename
    })
    .then((response) => {
      SetImageBase64(response.data.image)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const detectLabels = async() => {
    axios.post(`${API_URL}/images/detectLabels`, {
      image: imagebase64
    })
    .then((response) => {
      setEtiquetas(response.data.labels)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const translateText = async() => {
    axios.post(`${API_URL}/text/translate`, {
      text: etiquetas,
      language: "es"
    })
    .then((response) => {
      setLabelTranslate(response.data.traduccion)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getImageBase64();
    detectLabels();
    translateText();
  })

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
      ) : gallery ? (
        <Gallery data={props.data}/>
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
                  <Typography>
                    {labelTranslate}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleGallery}
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
