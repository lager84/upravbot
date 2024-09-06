import {useQuery} from '@apollo/client'
import {GET_ME_USERS} from '../../apollo/GetUserInfo';
import Loader from '../../components/loader/Loader';
import { useAuth } from "react-oidc-context";




const MainPage = () =>{

    const {loading , error , data} = useQuery(GET_ME_USERS)
    
//     const auth = useAuth();

if(loading){
    return (<Loader/>)
}
if(error){
    return(<h2>{error.message}</h2>)
}

    return (
      <>
        <h2>Главная</h2>
        <div>
        {data.meUserInfo.grants[0].userName}
        <div>
            {/* {auth.user?.profile.role} */}
        </div>
        </div>
        </>
       )
}


export default MainPage;