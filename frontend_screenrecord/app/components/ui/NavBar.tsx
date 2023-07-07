import React from 'react'
import styles from '../styles/navbar.module.css'
import {MdOutlineLightMode} from "react-icons/md"

const NavBar = () => {
  return <nav className={styles.nav}>
        <ul className={styles.ul}>
            <li>
                ONLINE SCREEN RECORDER 
            </li>
        </ul>

        <ul className={styles.ul}>
            <li><MdOutlineLightMode size={20} /></li>
            <li>PROFILE</li>
            <li>SIGN UP</li>
        </ul>
  </nav>
}

export default NavBar