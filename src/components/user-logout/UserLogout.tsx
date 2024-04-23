import styles from "./userlogout.module.css";
import imguser from "../../images/user.svg";
import imglogout from "../../images/logout.svg";
import { useState } from "react";
import { useAuth } from "react-oidc-context";

const UserLogout = () => {
  const [logout, setLogout] = useState(false);

  const logoutClick = () => {
    if (logout) {
      setLogout(false);
    } else {
      setLogout(true);
    }
  };

  const auth = useAuth();

  return (
    <div className={styles.flexCenter}>
      <button className={styles.buttonLogout} onClick={logoutClick}>
        <img className={styles.imgLogout} src={imguser} alt="Выход"></img>
      </button>
      {logout && (
        <div className={styles.divExit}>
          <button
            className={styles.buttonExit}
            onClick={() => void auth.signoutRedirect()}
          >
            <img className={styles.imageExit} src={imglogout} alt="выход"></img>
            Выход
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLogout;
