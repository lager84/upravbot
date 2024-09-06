import styles from "./user-info.module.css"
import accountStore from '../../services/accountsStore'



const UserInfo = () => {

  
  var data = accountStore((state)=>state)

    return(  

        <li className={styles.user}>
        <span className={styles.userLogin}></span>
         <div className={styles.divUser}>
          <strong className={styles.strongUser}>
       {data?.SecondName}{" "}{data?.FirstName}<br/>{data?.GivenName}<br/>{data?.role}<br/>{data?.Email}{" "}
       </strong>
       </div>
      </li>
      
    )
}

export default UserInfo