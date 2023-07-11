import React, { createContext, useRef, useState, useEffect } from "react";

const VideoContext = createContext({
  stream: null,
  showVideo : false,
  videoUrl : null,
  recordedVideo: { current: null },
  startRecording: () => {},

  StopCapture: () => {},
});

let url = "http://localhost:8000/upload";
let recordedChunks = [];
const Mediaoptions = { mimeType: 'video/webm;codecs=vp9' , videoBitsPerSecond: 5000000 };
let mediaRecorder;

const ContextProvider = ({ children }) => {
  const [showVideo, setShowVideo] = useState(true);
  const [stream, setStream] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const recordedVideo = useRef();




  let options = {
    video: true,
    audio : true,
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

  useEffect(() => {
    if (recordedVideo.current && stream) {
      recordedVideo.current.srcObject = stream;
      recordedVideo.current.play();
    }
  }, [stream]);
  
  const startRecording = async () => {
    //console.log("STARTING SCREEN CAPTURE" + " " + stream);
    let captureStream;
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(options);
    } catch (error) {
      console.log(error);
    }
    //console.log("WHILE CAPTURE" + " " + captureStream);
      setStream(captureStream);
      if (recordedVideo.current) {
        recordedVideo.current.srcObject = captureStream;
       // console.log("SRCoBJECT" + " " + recordedVideo.current.srcObject);
    }
     // Set up the MediaRecorder
     mediaRecorder = new MediaRecorder(captureStream, Mediaoptions);
     mediaRecorder.ondataavailable = (event) => {
      console.log('ondataavailable', event.data.size);
       if (event.data.size > 0) {
         recordedChunks.push(event.data);
         if (recordedChunks.length === 0) {
          console.log('The recordedChunks array is empty');
        } else {
          console.log('The recordedChunks array is not empty');
        }
       }
     };
     mediaRecorder.start();
     console.log("media recorder BEFORE",mediaRecorder)
  };



  const StopCapture = async () => {
    
    console.log("media recorder AFTER",mediaRecorder)
    //console.log("STOPPING CAPTURE" + " " + stream);
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      // Stop the MediaRecorder
      
      // Creating a Blob from the recorded data
      console.log('recordedChunks 2', recordedChunks );
      
    setShowVideo(false);
    //console.log("URL 1 ", videoUrl )

    
    let blob ;
     mediaRecorder.onstop = () => {
     blob = new Blob(recordedChunks, { type: 'video/webm;codecs=vp9' });
      console.log('Blob : ', blob);

      
      //console.log('Blob type:', blob.type);
    // Creating a temporary URL for the Blob
      setVideoUrl(URL.createObjectURL(blob));
      //console.log("VIDEO URL",videoUrl)
    }
    
    
    /* 
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
  
      const formData = new FormData();
      formData.append('videoFile', blob);
  
      const uploadResponse = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (uploadResponse.ok) {
        const result = await uploadResponse.json();
        const CloudinaryvideoUrl = result.url;
  
        console.log('Video uploaded to Cloudinary:', CloudinaryvideoUrl);
      } else {
        console.error('Error uploading video to Cloudinary:', uploadResponse.status);
      }
    } catch (error) {
      console.error('Error uploading video to Cloudinary:', error);
    }*/
    if(mediaRecorder){
      mediaRecorder.stop();      
     }
}
  };


  return (
    <VideoContext.Provider
      value={{
        stream,
        startRecording,
        StopCapture,
        showVideo,
        videoUrl,
        recordedVideo,
      }}>
      {children}
    </VideoContext.Provider>
  );
};

export { ContextProvider, VideoContext }
