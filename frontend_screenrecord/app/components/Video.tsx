"use client"

import React, { useContext } from 'react'
import styles from "./styles/video.module.css"
import { VideoContext } from '../VideoContext'

const Video = () =>{
        const {stream ,
            recordedVideo,
            StopCapture,
        } = useContext(VideoContext);

        let disabled = !stream || !recordedVideo ;
        console.log("stream and ref :" , stream , recordedVideo)
  return (
    <>
        <div className={styles.container__video}>
        <div className={styles.video}>{stream && <video ref={recordedVideo} autoPlay muted width={450} height={350}/>}</div> 
        {!stream && <h1>loading %...</h1>}

        <div className={styles.actions}>
                <button disabled={disabled} onClick={StopCapture}>STOP RECORDING</button>
                <button>SAVE IN GALLERY</button>
                <button disabled={disabled}>DOWNLOAD</button>
        </div>
        </div>
      
    </>
  )
}

export default Video