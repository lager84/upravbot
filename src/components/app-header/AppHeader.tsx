import React, { FC } from "react";
import styles from "../app-header/appheader.module.css";
import LogoImage from "../logo-image/LogoImage";
import UserLogout from "../user-logout/UserLogout";


const AppHeader: FC = () => {
  return (
    <header className={styles.header}> 
    <div className={styles.divRoot}>  
    <nav className={styles.nav}>
    <LogoImage/>
    <ul className={styles.nav_ul}>   
            <li className={styles.nav_item}>
            <UserLogout/>
            </li>
            </ul>
    </nav>
      </div>
    </header>
  );
};
export default AppHeader;
