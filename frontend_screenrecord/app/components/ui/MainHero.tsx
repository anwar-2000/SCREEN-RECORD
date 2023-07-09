"use client"
import { VideoContext } from '@/app/VideoContext';
import React, { useContext } from 'react'
import styles from "../styles/main.module.css"

const MainHero = () => {
  const {stream ,
    startRecording,
} = useContext(VideoContext);
  return <div className='container'>
        <div className={styles.head}>
            <h1>Online Screen Recorder</h1>
            <small>Create high-quality screen recordings effortlessly. Capture tutorials, gaming highlights, and presentations with just a few clicks. Your videos are securely saved in your personal database, accessible anytime after login.</small>
        </div>
        <div className={styles.actions}>
                <button onClick={startRecording}>Start Recording</button>
        </div>
  </div>
}
export default MainHero