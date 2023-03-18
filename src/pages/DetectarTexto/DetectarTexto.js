import { useState } from 'react';
import React from 'react'
import axios from 'axios';
import { API_URL } from "../../utils/Constants";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './DetectarTexto.css'

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

function DetectarTexto() {

    const classes = useStyles();

    const [postImage, setPostImage] = useState({
        image: "",
    });

    const [file, setFile] = useState();

    const [detectedText, setDetectedText] = useState()

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
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, image: base64 });
        setFile(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       

        console.log(postImage)

        const response = await axios.post(`${API_URL}/images/detectText`, postImage)

        setDetectedText(response.data.text);

        console.log(response)
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Detectar Texto
                    </Button>
                </form>
            </Paper>
            &nbsp;
            <Paper elevation={3} className={classes.paper}>
                <h2>Resultados</h2>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="textResults"
                    name="textResults"
                    type='text'
                    multiline
                    rows={23}
                    maxRows={23}
                    value={detectedText}
                />
            </Paper>
        </div>
    )
}

export default DetectarTexto
