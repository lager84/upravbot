import { FC,  useState } from "react";
import LogoImage from "../logo-image/LogoImage";
import UserLogout from "../user-logout/UserLogout";
import menu2 from "../../img/menu2.svg";
import close from "../../img/close.svg";
import LeftMenu from "../left-menu/LeftMenu";


const AppHeader: FC = () => {
  const [state, setState] = useState(false);

  const menuMob = () => {
    if (state) {
      setState(false);
    } else {
      setState(true);
    }
  };

  return (
    <header className="internal1 h90">
      <div className="headerWrapper">
        <ul className="nav h-100 ml-3 w-100">
          <li className="nav-item">
            <a
              title="Меню"
              className={
                !state ? "collapsed flexCenter pt-1" : "flexCenter pt-1"
              }
              onClick={menuMob}
              data-toggle="collapse"
              href="#collapse0"
            >
              <span className="if-collapsed">
                <img src={menu2} className="mr-2" alt=""></img>
              </span>
              <span className="if-not-collapsed">
                <img src={close} className="mr-2" alt=""></img>
              </span>
              {state && (
                <ul className="mobileMenu mm-top">
                  <LeftMenu />
                </ul>
              )}
            </a>
          </li>
          <li className="nav-item logo col-lg-2half">
            <LogoImage />
          </li>
          <li className="nav-item ml-auto mr-4">
            <ul className="nav w-100">
              <UserLogout />
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default AppHeader;
