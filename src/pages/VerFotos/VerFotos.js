import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Detalle from '../DetalleFoto/Detalle'
import { API_URL } from "../../utils/Constants";
import Carousel from "react-material-ui-carousel";
import AliceCarousel from "react-alice-carousel";
import { CardMedia } from "@material-ui/core";

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

function VerFotos(props) {
  const { Usuario, Nombres, Contrasenia, Foto } = props.data;
  const classes = useStyles();
  const imgUrl = Foto;
  const input1 = "Input 1";
  const input2 = "Input 2";
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [subirFoto, setSubirFoto] = useState(false);
  const [editarAlbum, setEditarAlbum] = useState(false);
  const [albumNames, setAlbumNames] = useState([]);
  const [albumes, setAlbumes] = useState({});
  const albumResponses = {};

  const handleEditarPerfil = () => {
    setEditarPerfil(true);
  };

  const handleSubirFoto = () => {
    setSubirFoto(true);
  };

  const handleEditarAlbum = () => {
    setEditarAlbum(true);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleDetalle = () => {
    FotoDetall();
  };




  function getAlbum() {
    axios
      .get(`${API_URL}/album/getList/${Usuario}`)
      .then((response) => {
        //console.log(response.data.result);
        setAlbumNames(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getPhotosByAlbum() {
    Promise.all(
      albumNames.map((album) =>
        axios
          .get(`${API_URL}/album/getPhotosByAlbum/${album.NameAlbum}`)
          .then((response) => {
            return { albumName: album.NameAlbum, fotos: response.data.fotos };
          })
          .catch((error) => {
            console.error(error);
          })
      )
    ).then((responses) => {
      const albumResponses = {};
      responses.forEach((response) => {
        albumResponses[response.albumName] = response;
      });
      setAlbumes(albumResponses);
    });
  }

  useEffect(() => {
    getAlbum();
  }, []);

  useEffect(() => {
    getPhotosByAlbum();
  }, [albumNames]);

  useEffect(() => {
    console.log("albumes", albumes);
  }, [albumes]);

  function AlbumCarousel({ fotos }) {
    const isNull = (arr) => !arr || arr.length === 0;

    if (isNull(fotos)) {
      return <p>No hay fotos en este álbum</p>;
    }

    return (
      <Carousel>
        <AliceCarousel>
          {fotos.map((foto) => (
            <img
              key={foto.URLFotos}
              src={foto.URLFotos}
              alt=""
              style={{ width: 200, height: 200 }}
              onClick={handleDetalle()}
            />
          ))}
        </AliceCarousel>
      </Carousel>
    );
  }

  return (
    <>
      {editarPerfil ? (
        <EditarUser data={props.data} />
      ) : subirFoto ? (
        <SubirFoto data={props.data} />
      ) : editarAlbum ? (
        <EditarAlbum data={props.data} />
      ) : (
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Ver Fotos
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
                  >
                    Subir Foto
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleEditarAlbum}
                  >
                    Editar album
                  </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div>
                    {Object.values(albumes).map((album) => (
                      <div key={album.albumName}>
                        <h2>{album.albumName}</h2>
                        <AlbumCarousel fotos={album.fotos} />
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default VerFotos;
