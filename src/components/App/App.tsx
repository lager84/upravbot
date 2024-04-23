import { useAuth } from "react-oidc-context";
import Loader from "../loader/Loader";
import AppHeader from "../app-header/AppHeader";
import styles from "../App/App.module.css"


const App = () => {
  const auth = useAuth();
  

  if (auth.isLoading) {
    return <Loader/>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    console.log(auth);
    return (
     <div className={styles.App}>  
    <AppHeader/>

       <div>
        Hello {auth.user?.profile.email}{" "}  
      </div> 
      </div> 
      
      
    );
  }
  auth.signinRedirect();
  return <Loader/>
  //return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
 
};
export default App;
