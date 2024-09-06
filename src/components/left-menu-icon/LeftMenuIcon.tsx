import { NavLink } from "react-router-dom";
import styles from "../left-menu-icon/left-menu-icon.module.css";
import { FC } from "react";


type TProps = {
  href: string;
  children: string;
  icon:string;
};

const LeftMenuIcon: FC<TProps> = ({ icon , href, children }) => {
  return (
    <NavLink to={href} className={styles.link}>
      {({ isActive }) => (
        <div className={isActive ? styles.lmdivActive : styles.lmdiv}>
        <img className={isActive ? styles.imglmActive : styles.imglm} src={icon} alt=""></img>
        <span className={isActive ? styles.lm1Active : styles.lm1}> 
            {children}
          </span>
        </div>
      )}
    </NavLink>
  );
};

export default LeftMenuIcon;
