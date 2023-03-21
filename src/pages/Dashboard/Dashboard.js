import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext, useAuth } from "../../services/auth";
import { Card, CardMedia, Button, makeStyles, CardContent, Typography, Grid, TextField } from "@material-ui/core";
import messi from '../Dashboard/messi.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
  }
}))

function Dashboard(props) {
  console.log(props);
  const classes = useStyles();
  const { isAuthenticated } = useContext(AuthContext);

  /*useEffect(() => {
    console.log("estaAutenticado", isAuthenticated);
    if (!isAuthenticated) {
      window.location.href = "/login";
      return null;
    }
  }, [isAuthenticated]);*/

  return (
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
          <Button
            variant="contained"
            color="primary"
          >
            Ver Fotos
          </Button>
          <Button
            variant="contained"
            color="primary">
              Subir Foto
          </Button>
          <Button
            variant="contained"
            color="primary"
          >Editar Perfil
          </Button>
          <Button
            variant="contained"
            color="primary"
          >
            Extraer Texto
          </Button>
          <Button
            variant="contained"
            color="primary"
          >Cerrar Sesion</Button>
          </CardContent>

          
        </Card>

      </div>
  )

}

export default Dashboard;
