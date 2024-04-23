import styles from "../logo-image/logoimage.module.css"
import logo from "../../images/logo-new.svg";


const LogoImage = ()=>{

    return(
        <a href="/" className={styles.logoUri}>
        <img alt="logo" src={logo} title="Управбот"></img>
        </a>
    )

}

export default LogoImage