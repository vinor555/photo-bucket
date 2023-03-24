import React, {useRef } from "react";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Button from "@material-ui/core/Button";
import { API_URL } from "../../utils/Constants";
import axios from "axios";
import User from "../User/User";
 
const videoConstraints = {
  width: 540,
  facingMode: "environment"
};
 
const Camera = (props) => {

  const user = props.data;
  //console.log(user);
  
  const webcamRef = useRef(null);
  const [url, setUrl] = useState('');
  const [profileImg , setProfileImg] = useState('');
  const [imagebase64, SetImageBase64] = useState('');
  const [data, setData] = useState();
  const [auth, setAuth] = useState(false);
 
  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    //console.log(imageSrc)
    setUrl(imageSrc);

    const body = {
      image: imagebase64,
      image2: imageSrc.split(',')[1],
    };

    console.log(body);

    axios
      .post(`${API_URL}/images/compareFaces`, body)
      .then((response) => {
        if (response.data.msg === "Comparacion exitosa") {

          //const res = axios.get(`${API_URL}/users/getUserInfo/`+user);

          //console.log(res);
          //setData(res.data.user);
          setAuth(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [webcamRef, imagebase64]);
 
  const onUserMedia = (e) => {
    //console.log(e);
  };

  useEffect(() => {
    const getImageProfile = async() => {
      const res = await axios.get(`${API_URL}/users/getProfilePhoto/`+user);
      const resp = await axios.get(`${API_URL}/users/getUserInfo/`+user);
      //console.log(res.data.foto);
      setProfileImg(res.data.foto);
      setData(resp.data.user);
    }

    const getImageBase64 = async() => {
      const regex = /[^\/]+\.([a-zA-Z]+)$/;
      const match = profileImg.match(regex)
      var filename = "";
      if (match) {
        filename = match[0];
        console.log(filename);
      } else {
        console.log("La url no contiene una extension de archivo valia");
      }
      await axios.post(`${API_URL}/images/downloadPerfil`, {
        pathname: filename
      })
      .then((response) => {
        SetImageBase64(response.data.image)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    getImageProfile();
    getImageBase64();
  },[profileImg, user])
 
  return (
    <>
    {auth ? (
        <User data={data} />
      ) : (
      <div>
        <Webcam
          ref={webcamRef}
          audio={true}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
        />
        <Button onClick={capturePhoto}>Capture</Button>
        <Button onClick={() => setUrl(null)}>Refresh</Button>
      </div>
      )}
    </>
  );
};
 
export default Camera;