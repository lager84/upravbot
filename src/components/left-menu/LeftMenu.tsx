import iconProfile from "../../img/ic-user-bl.svg";
import iconUK from "../../img/news-ic-bl.svg";
import iconObject from "../../img/home-ic-bl.svg";
import iconUsers from "../../img/meter-ic-bl.svg";
import iconDisp from "../../img/tasks-ic-bl.svg";
// import styles from "../left-menu/left-menu.module.css"
import LeftMenuIcon from "../left-menu-icon/LeftMenuIcon";
import { URL_ADMINISTRATOR } from "../../utils/routes";
import { URL_REGISTER_UO } from "../../utils/routes";
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

      <LeftMenuIcon href={"/aaa"} icon={iconObject}>
        Объекты
      </LeftMenuIcon>

      <LeftMenuIcon href={"/bbb"} icon={iconUsers}>
        Учетные записи
      </LeftMenuIcon>

      <LeftMenuIcon href={"/ccc"} icon={iconDisp}>
        Диспетчерские
      </LeftMenuIcon>
    </>
  );
};

export default LeftMenu;
