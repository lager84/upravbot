import iconProfile from "../../images/ic-user-bl.svg"
import iconUK from "../../images/news-ic-bl.svg"
import iconObject from "../../images/home-ic-bl.svg"
import iconUsers from "../../images/meter-ic-bl.svg"
import iconDisp from "../../images/tasks-ic-bl.svg"
import styles from "../left-menu/left-menu.module.css"
import LeftMenuIcon from "../left-menu-icon/LeftMenuIcon";
import {URL_ADMINISTRATOR} from "../../utils/routes"




const LeftMenu = () => {

    return(
 <>
<li className={styles.lm_li}>
<LeftMenuIcon href={URL_ADMINISTRATOR} icon={iconProfile}>
Настройки профиля
</LeftMenuIcon>
</li>

<li className={styles.lm_li}>
<LeftMenuIcon href={"/ggg"} icon={iconUK}>
Управляющие организации
</LeftMenuIcon>
</li>
<li className={styles.lm_li}>
<LeftMenuIcon href={"/aaa"} icon={iconObject}>
Объекты
</LeftMenuIcon>
</li>
<li className={styles.lm_li}>
<LeftMenuIcon href={"/bbb"} icon={iconUsers}>
Учетные записи
</LeftMenuIcon>
</li>
<li className={styles.lm_li}>
<LeftMenuIcon href={"/ccc"} icon={iconDisp}>
Диспетчерские
</LeftMenuIcon>
</li>
</>
);
}

export default LeftMenu