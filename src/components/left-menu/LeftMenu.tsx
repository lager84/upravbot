import iconProfile from "../../img/ic-user-bl.svg";
import iconUK from "../../img/news-ic-bl.svg";
import iconObject from "../../img/home-ic-bl.svg";
import iconUsers from "../../img/meter-ic-bl.svg";
import iconDisp from "../../img/tasks-ic-bl.svg";
// import styles from "../left-menu/left-menu.module.css"
import LeftMenuIcon from "../left-menu-icon/LeftMenuIcon";
import { URL_ACCOUNT, URL_ADMINISTRATOR, URL_DISP, URL_OBJECTS, URL_PROJECTS , URL_REGISTER_UO } from "../../utils/routes";

// import  "../../css/style.css"

const LeftMenu = () => {
  return (
    <>
      <LeftMenuIcon href={URL_ADMINISTRATOR} icon={iconProfile}>
        Настройки профиля
      </LeftMenuIcon>

      <LeftMenuIcon href={URL_REGISTER_UO} icon={iconUK}>
        Управляющие организации
      </LeftMenuIcon>
      <LeftMenuIcon href={URL_PROJECTS} icon={iconObject}>
        Проекты
      </LeftMenuIcon>

      <LeftMenuIcon href={URL_OBJECTS} icon={iconObject}>
        Объекты
      </LeftMenuIcon>

      <LeftMenuIcon href={URL_ACCOUNT} icon={iconUsers}>
        Учетные записи
      </LeftMenuIcon>

      <LeftMenuIcon href={URL_DISP} icon={iconDisp}>
        Диспетчерские
      </LeftMenuIcon>
    </>
  );
};

export default LeftMenu;
