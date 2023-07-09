"use client"
import { useContext, useEffect, useState } from 'react'
import Examples from './components/ui/Examples'
import MainHero from './components/ui/MainHero'
import Video from './components/Video'
import styles from './page.module.css'
import { VideoContext } from './VideoContext'

export default function Home() {

  const {stream} = useContext(VideoContext)
  const [showContent, setshowContent] = useState(true)

  const handleVideoDismiss = () => {
    setshowContent(false);
  };
  
  return (
    <main className={styles.main}>
        <MainHero />
        { showContent && <div>
        {stream && <Video onchange={handleVideoDismiss}/>}
        </div>}
        <Examples />
    </main>
  )
}
