// import React from 'react'
import styles from './navbar.module.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className={styles.nav}>
      {/* <Link to="/" style={{ textDecoration: 'none' }}> */}
        <div className={styles.appHeading} onClick={()=>window.location.href='/'}>Rick & Morty</div>
      {/* </Link> */}
    </nav>
  )
}

export default Navbar
