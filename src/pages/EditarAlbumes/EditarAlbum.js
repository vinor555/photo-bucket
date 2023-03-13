import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import User from "../User/User";
import Typography from "@material-ui/core/Typography";
import SubirFoto from "../EditarUser.js/SubirFoto";
import Box from "@material-ui/core/Box";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../utils/Constants";
import VerFotos from "../VerFotos/VerFotos";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function EditarAlbum(props) {
  const { Usuario, Nombres, Contrasenia, Foto } = props.data;
  const classes = useStyles();
  const imgUrl = Foto;
  const input1 = "Input 1";
  const input2 = "Input 2";
  const [miPefil, setMiperfil] = useState(false);
  const [subirFoto, setSubirFoto] = useState(false);
  const [nombreAlbum, setNombreAlbum] = useState("");
  const [nombreAlbumAux, setNombreAlbumAux] = useState("");
  const [albumNames, setAlbumNames] = useState([]);
  const [verFotos, setVerFotos] = useState(false);

  const handleVerFotos = () => {
    setVerFotos(true);
  };

  const handleCreateAlbun = () => {
    if (nombreAlbum !== "") {
      createAlbum();
    }
  };

  function createAlbum() {
    const body = {
      user: Usuario,
      albumName: nombreAlbum,
    };
    axios
      .post(`${API_URL}/album/create`, body)
      .then((response) => {
        console.log(response.data);
        getAlbum();
        setNombreAlbum("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleGetAlbumes = () => {
    getAlbum();
  };

  const handleDeleteAlbum = () => {
    console.log(nombreAlbumAux);
    console.log(Usuario);
    deleteAlbum2();
  };

  function deleteAlbum2() {
    const body = {
      user: Usuario,
      albumName: nombreAlbumAux,
    };
    console.log(body);
    axios
      .delete(`${API_URL}/album/delete`, body)
      .then((response) => {
        console.log(response.data);
        getAlbum();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteAlbum() {
    axios
      .delete(
        `${API_URL}/album/delete?user=${Usuario}&albumName=${nombreAlbum}`
      )
      .then((response) => {
        console.log(response.data);
        getAlbum();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAlbum() {
    axios
      .get(`${API_URL}/album/getList/${Usuario}`)
      .then((response) => {
        console.log(response.data.result);
        setAlbumNames(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAlbum();
  }, []);

  const handleMiPerfil = () => {
    setMiperfil(true);
  };

  const handleSubirFoto = () => {
    setSubirFoto(true);
  };

  const handleChange = (event) => {
    setNombreAlbumAux(event.target.value);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <>
      {miPefil ? (
        <User data={props.data} />
      ) : subirFoto ? (
        <SubirFoto data={props.data} />
      ) : verFotos ? (
        <VerFotos data={props.data} />
      ) : (
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Editar Albumes
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
                    onClick={handleMiPerfil}
                  >
                    Mi Perfil
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleVerFotos}
                  >
                    Ver fotos
                  </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div className={classes.form}>
                    <TextField
                      label="Nombre de album"
                      value={nombreAlbum}
                      className={classes.input}
                      onChange={(event) => setNombreAlbum(event.target.value)}
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleCreateAlbun}
                        style={{ flexGrow: 1, flexShrink: 1 }}
                        size="small"
                      >
                        Agregar
                      </Button>
                      <Box mx={1} />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleGetAlbumes}
                        style={{ flexGrow: 1, flexShrink: 1 }}
                        size="small"
                      >
                        Modificar
                      </Button>
                      <Box mx={1} />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubirFoto}
                        style={{ flexGrow: 1, flexShrink: 1 }}
                        size="small"
                      >
                        Cancelar
                      </Button>
                    </Box>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="nombre-foto-label">
                        Nombre Album
                      </InputLabel>
                      <Select
                        labelId="nombre-foto-label"
                        id="nombre-foto-select"
                        value={nombreAlbumAux}
                        onChange={handleChange}
                      >
                        {albumNames.map((albumName) => (
                          <MenuItem
                            key={albumName.NameAlbum}
                            value={albumName.NameAlbum}
                          >
                            {albumName.NameAlbum}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleDeleteAlbum}
                    >
                      Eliminar Album
                    </Button>
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

export default EditarAlbum;
