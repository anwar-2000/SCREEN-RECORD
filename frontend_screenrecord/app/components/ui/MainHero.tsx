import React from 'react'
import styles from "../styles/main.module.css"


const MainHero = () => {
  return <div className='container'>
        <div className={styles.head}>
            <h1>Online Screen Recorder</h1>
            <small>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus accusamus distinctio ullam est cum!</small>
        </div>
        <div className={styles.actions}>
                <button>Start Recording</button>
        </div>
  </div>
}

export default MainHero