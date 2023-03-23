import React, {useRef } from "react";
import Webcam from "react-webcam";
import Button from "@material-ui/core/Button";
 
const videoConstraints = {
  width: 540,
  facingMode: "environment"
};
 
const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
 
  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    //console.log(imageSrc)
    setUrl(imageSrc);
  }, [webcamRef]);
 
  const onUserMedia = (e) => {
    console.log(e);
  };
 
  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
      />
      <Button onClick={capturePhoto}>Capture</Button>
      <Button onClick={() => setUrl(null)}>Refresh</Button>
    </>
  );
};
 
export default Camera;