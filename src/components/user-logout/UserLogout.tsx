import styles from "./userlogout.module.css";
import imguser from "../../img/user.svg";
import imglogout from "../../img/logout.svg";
import { useState } from "react";
import { useAuth } from "react-oidc-context";
import OutsideClickHandler from "react-outside-click-handler";

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
    <>
      <li className="nav-item"></li>
      <li className="divider40"></li>
      <li className="nav-item login">
        <OutsideClickHandler
          onOutsideClick={() => {
            setLogout(false);
          }}
        >
          <button className="nav-link transp border-0" onClick={logoutClick}>
            <img className="w42" src={imguser} alt="Выход"></img>
          </button>
          {logout && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                transform: "translate3d(-71px, 54px, 0px)",
                top: "0px",
                left: "0px",
                willChange: "transform",
              }}
            >
              <button
                className={styles.buttonExit}
                onClick={() => void auth.signoutRedirect()}
              >
                <img
                  className={styles.imageExit}
                  src={imglogout}
                  alt="выход"
                ></img>
                Выход
              </button>
            </div>
          )}
        </OutsideClickHandler>
      </li>
    </>
  );
};

export default UserLogout;
