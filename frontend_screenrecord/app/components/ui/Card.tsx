import React from 'react'
import styles from "../styles/card.module.css"


const Card = ({titre , description} : {titre : string , description : string}) => {
  return <div className={styles.container}>
        <h1>{titre}</h1>
        <small>{description}</small>
  </div>
}

export default Card