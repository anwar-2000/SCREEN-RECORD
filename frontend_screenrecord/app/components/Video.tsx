"use client"
import {FaDeleteLeft} from "react-icons/fa6"
import React, { useContext, useEffect } from 'react'
import styles from "./styles/video.module.css"
import { VideoContext } from '../VideoContext'

interface Props {
  onchange : () => void
}
const Video:React.FC<Props> = ({onchange}) =>{
        const {stream ,
          showVideo,
          videoUrl,
          startRecording,
            recordedVideo,
            StopCapture,
        } = useContext(VideoContext);

        useEffect(()=>{
        },[stream , recordedVideo])
  return (
    <>
        <div className={styles.container__video}>
         <FaDeleteLeft id="icon" color="red" className={styles.icon} size={40} onClick={onchange}/> 
       { showVideo && <div className={styles.video}>{stream &&  <video  playsInline muted ref={recordedVideo} autoPlay  width={550}/>}</div>}
       {!showVideo &&  <div className={styles.video}>{stream &&  <video  playsInline controls muted={false} src={videoUrl as unknown as string}  width={550}/>}</div> }
        <div className={styles.actions}>
        {!videoUrl && 
       <button onClick={StopCapture}>Stop Recording</button>
          }
                <button>SAVE IN GALLERY</button>
                <a href={videoUrl as unknown as string} download>Download</a>
        </div>
        </div>
      
    </>
  )
}

export default Video