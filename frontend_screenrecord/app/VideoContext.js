import React, { createContext, useRef, useState, useEffect } from "react";

const VideoContext = createContext({
  stream: null,
  recordedVideo: { current: null },
  startRecording: () => {},
  StopCapture: () => {},
});

let url = "http://localhost:8000/upload";

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const recordedVideo = useRef();

  useEffect(() => {
    console.log("STREAM" + " " +stream);
   }, [stream]);


  let options = {
    video: true,
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
      suppressLocalAudioPlayback: true,
    },
    surfaceSwitching: "include",
    selfBrowserSurface: "exclude",
    systemAudio: "exclude",
  };



  const startRecording = async () => {
    console.log("STARTING SCREEN CAPTURE" + " " + stream);
    let captureStream;
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(options);
    } catch (error) {
      console.log(error);
    }
    console.log("WHILE CAPTURE" + " " + captureStream);
    if (captureStream) {
      setStream(captureStream);
      if (recordedVideo.current) {
        recordedVideo.current.srcObject = stream;
        console.log("SRCoBJECT" + " " +recordedVideo.current.srcObject);
      }
    }
  };
  useEffect(() => {
    if (recordedVideo.current && stream) {
      recordedVideo.current.srcObject = stream;
      console.log("SRCoBJECT" + " " +recordedVideo.current.srcObject);
      recordedVideo.current.play();
    }},[])

  const StopCapture = async () => {
    console.log("STOPPING CAPTURE" + " " + stream);
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      const videoBlob = await fetch(recordedVideo.current?.src || "").then(
        (response) => response.blob()
      );

      const formData = new FormData();
      formData.append("file", videoBlob);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          const videoUrl = result.secure_url;

          console.log("Video uploaded to Cloudinary:", videoUrl);
        } else {
          console.error(
            "Error uploading video to Cloudinary:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
      }
    }
  };

  return (
    <VideoContext.Provider
      value={{
        stream,
        startRecording,
        StopCapture,
        recordedVideo,
      }}>
      {children}
    </VideoContext.Provider>
  );
};

export { ContextProvider, VideoContext };
