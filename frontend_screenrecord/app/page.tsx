"use client"

import Image from 'next/image'
import { useContext } from 'react'
import Examples from './components/ui/Examples'
import MainHero from './components/ui/MainHero'
import Video from './components/Video'
import styles from './page.module.css'
import { VideoContext } from './VideoContext'

export default function Home() {
  const {stream} = useContext(VideoContext)
  return (
    <main className={styles.main}>
        <MainHero />
        {stream && <Video />}
        <Examples />
    </main>
  )
}
