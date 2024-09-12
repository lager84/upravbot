import styles from "./user-info.module.css"
import accountStore from '../../services/accountsStore'
import ub from '../../img/ub.png'




const UserInfo = () => {

  
  var data = accountStore((state)=>state)

    return(  

        <li className="nav-link flexHoriz ml-2">
        <span className="d-block w48 h48 rounded8 flex-shrink-0 mr-3" style={{background:'#eaeaea no-repeat center center', backgroundImage:'url('+ ub +')' , backgroundSize:'contain'}}></span>
         <div>
          <strong className="font15 darkGreen">
       {data?.SecondName}{" "}{data?.FirstName}
       <br/>{data?.GivenName}
       <br/>{data?.role}<br/>{data?.Email}{" "}
       </strong>
       </div>
      </li>
      
    )
}

export default UserInfo