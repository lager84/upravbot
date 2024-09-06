import { useAuth } from "react-oidc-context";
import Loader from "../loader/Loader";
import AppHeader from "../app-header/AppHeader";
import styles from "../App/App.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { URL_ROOT, URL_ADMINISTRATOR, URL_ANY, URL_MANAGER } from "../../utils/routes";
import {MainPage , AdministratorPage, NotFound404 , ManagerPage }from "../../pages";
import ProtectedRoute from "../protected-route"
import { withAuthenticationRequired } from "react-oidc-context";
import UserInfo from "../user-info/UserInfo";
import LeftMenu from "../left-menu/LeftMenu";
import accountStore from '../../services/accountsStore'
import {TState} from '../../utils/typesTS'
import {  useEffect } from 'react';


const App = () => {
  const location = useLocation();

  const stateLocation = location.state && location.state.location;

  const auth = useAuth();

  useEffect(() => {
 
  accountStore.setState((state:TState) => ({SecondName: auth.user?.profile.family_name , 
    FirstName: auth.user?.profile.name, 
    GivenName: auth.user?.profile.given_name , 
    Email: auth.user?.profile.email ,
    password: auth.user?.profile.sid ,
    role: auth.user?.profile.role,
    userID:auth.user?.profile.sub,
    phone_number: auth.user?.profile.phone_number}))
  },[]);
   



  if (auth.isLoading) {
    return <Loader/>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  
  return (
    <>
    {console.log(auth)}
      <div className={styles.App}>
        <AppHeader />
      </div>
      <div className={styles.page}>
      <div className={styles.lm}>
      <ol className={styles.leftLogin}>
       <UserInfo />
       <li className={styles.line}></li>
      </ol>
      <ol className={styles.leftLoginLM}> 
      <LeftMenu/> 
      </ol>
      </div>
      <div className={styles.main}>
        <Routes location={stateLocation || location}>
          <Route path={URL_ROOT} element={<ProtectedRoute startPage = {true} element= {<MainPage />} />} />
          <Route path={URL_ANY} element={<NotFound404 />} />
          <Route path={URL_ADMINISTRATOR} element={<ProtectedRoute administrator={true} element={<AdministratorPage />} />} />
          <Route path={URL_MANAGER} element={<ProtectedRoute manager={true}  element={<ManagerPage />} />} />
        </Routes>
      </div>
      </div>
    </>
  );
};
//auth.signinRedirect();
//return <Loader/>
//return <button onClick={() => void auth.signinRedirect()}>Log in</button>;

//export default App;
export default withAuthenticationRequired(App, {
  OnRedirecting: () => (<div></div>)
});