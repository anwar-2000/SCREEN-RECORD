"use client"
import {FaDeleteLeft} from "react-icons/fa6"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./styles/video.module.css"
import { VideoContext } from '../VideoContext'
import { saveVideo } from "@/lib/utils"

interface Props {
  onchange : () => void
}
const Video:React.FC<Props> = ({onchange}) =>{
  const [token, settoken] = useState('')
        const {stream ,
          showVideo,
          videoUrl,
            recordedVideo,
            StopCapture,
        } = useContext(VideoContext);

        useEffect(()=>{
            let userToken = localStorage.getItem('userToken');
            if(userToken){
              //console.log(userToken)
              settoken(userToken)
            }
        },[stream , recordedVideo])

        useEffect(()=>{
          console.log("video url" + " " + videoUrl)
        },[videoUrl])

        async function handleSaveVideo  (url:string , token  : string) {
          console.log("SAVING VIDEO WITH ",url,token)
            const response = await saveVideo(url,token)
            console.log(response)
        }
       
  
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
                <button onClick={()=>handleSaveVideo(videoUrl!,token)}>SAVE IN GALLERY</button>
                <a href={videoUrl as unknown as string} download>Download</a>
        </div>
        </div>
      
    </>
  )
}

export default Video