"use client"
"use client"
import React, { useContext, useEffect } from 'react'
import styles from "./styles/video.module.css"
import { VideoContext } from '../VideoContext'

const Video = () =>{
        const {stream ,
          showVideo,
          videoUrl,
            recordedVideo,
            StopCapture,
        } = useContext(VideoContext);

        let disabled = !stream || !recordedVideo ;
        useEffect(()=>{

        },[stream , recordedVideo])
  return (
    <>
        <div className={styles.container__video}>
       { showVideo && <div className={styles.video}>{stream &&  <video  playsInline muted ref={recordedVideo} autoPlay  width={350}/>}</div>}
       {!showVideo &&  <div className={styles.video}>{stream &&  <video  playsInline controls src={videoUrl as unknown as string}  width={350}/>}</div> }
        <div className={styles.actions}>
                <button disabled={disabled} onClick={StopCapture}>STOP RECORDING</button>
                <button>SAVE IN GALLERY</button>
                <a href={videoUrl as unknown as string} download>Download</a>
        </div>
        </div>
      
    </>
  )
}

export default Video