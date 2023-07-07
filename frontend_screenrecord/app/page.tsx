import Image from 'next/image'
import Examples from './components/ui/Examples'
import MainHero from './components/ui/MainHero'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
        <MainHero />
        <Examples />
    </main>
  )
}
