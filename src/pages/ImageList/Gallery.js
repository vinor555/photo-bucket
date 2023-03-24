import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/Constants";
import Detalle from '../DetalleFoto/Detalle'
import User from "../User/User";
import { Button } from '@material-ui/core';

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
    width: "1200px",
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

function Gallery(props) {
  const { Usuario, Nombres, Contrasenia, Foto } = props.data;

  const classes = useStyles();

  const [fotos, setFotos] = useState([]);
  const [Fnombre, setName] = useState("");
  const [fotoName, setFotoName] = useState([]);
  const [auth, setAuth] = useState(false);
  const [verHome, setVerHome] = useState(false);


  const handleVolver = () => {
    setVerHome(true);
  };


  const handleDetalle = (name) => {
    FotoDetalle(name);
  };

  function FotoDetalle(name) {
    axios
      .get(`${API_URL}/images/detallefoto/${name}`)
      .then((response) => {
        console.log(response.data.foto);
        setFotoName(response.data.foto);
        setAuth(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    const getFotos = async () => {
      const res = await axios.get(`${API_URL}/images/getImagesByUser/${Usuario}`);
      console.log(res);
      setFotos(res.data.result);
    };
    getFotos();
  }, [Usuario]);

  function handleClick (name)  {
    console.log(name);
    setName(name);
    handleDetalle(name);
  };
  return (
    <>
      {auth ? (
        <Detalle data={fotoName} />
      ) : verHome ? (
        <User data={props.data}/>
      ) : (
        <div className={classes.root}>
          <Paper elevation={3} className={classes.paper}>
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleVolver}
            >
              Regresar
            </Button>
            <ImageList sx={{ width: 700, height: 650 }}>
              <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Galeria de fotos</ListSubheader>
              </ImageListItem>
              {fotos.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={item.user}
                    actionIcon={
                      <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        value={item.name}
                        onClick={() => handleClick(item.name)}
                        >
                          Ver
                        </Button>

                    }
                    
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </div>
      )}
    </>
  )
}

export default Gallery
