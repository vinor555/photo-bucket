import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Paper, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../utils/Constants";
import './Register.css'

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

function Register() {
  const classes = useStyles();
  const [userName, setUsername] = useState("");
  const [userName2, setUsername2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [postImage, setPostImage] = useState({
    image: "",
    idImage: ""
  });

const [file, setFile] = useState();

  const handleRegister = () => {
    if (userName !== "" && userName2 !== "") {
      if (password !== "" && password === password2) {
        console.log(userName);
        console.log(userName2);
        console.log(password);
        console.log(password2);
        registerUser();
      } else {
        console.log("passwords deben ser iguales");
      }
    } else {
      console.log("error username no puede venir vacio");
    }
    console.log();
  };

  function registerUser() {
    const body = {
      user: userName,
      names: userName2,
      password: password,
      photo:
        "https://practica1-g7-imagenes.s3.amazonaws.com/Fotos_Perfil/aleesan7.jpg",
    };
    axios
      .post(`${API_URL}/users/register`, body)
      .then((response) => {
        console.log(response.data.msg);
        if (response.data.msg === "Usuario registrado exitosamente!") {

          const body2 = {
            id : postImage.idImage,
            description : 'Foto Perfil',
            uType : 'perfil',
            album : 'perfil',
            user : userName,
            photo : postImage.image
          }

          axios.post(`${API_URL}/images/upload`, body2).then((response2)=>{
            console.log(response2.data.msg);
            
            if(response2.data.message==='Se agrego la imagen exitosamente'){
              window.location.href = "/";
            }
          }).catch((error) => {
            console.error(error);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result.split(',')[1]);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const name = file.name;

    const base64 = await convertToBase64(file);

    setPostImage({ ...postImage, image: base64, idImage :  name});
    setFile(URL.createObjectURL(file));
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Username"
            name="nombre"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Nombre Completo"
            name="email"
            autoComplete="email"
            onChange={(event) => setUsername2(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(event) => setPassword2(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fileUploader"
            name="fileUploader"
            autoFocus
            type='file'
            onChange={(e) => handleFileUpload(e)}
          />
          
          <img src={file} />

          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            Registrarse
          </Button>
          <Link to="/" className={classes.link}>
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Link>
        </form>
      </Paper>
    </div>
  );
}

export default Register;
