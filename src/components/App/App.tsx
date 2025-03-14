import { useAuth } from "react-oidc-context";
import Loader from "../loader/Loader";
import AppHeader from "../app-header/AppHeader";
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import { Routes, Route, useLocation} from "react-router-dom";
import { URL_ROOT, URL_ADMINISTRATOR, URL_ANY, URL_MANAGER , URL_REGISTER_UO , URL_EDIT_ORG , URL_CREATE_ORG, URL_PROJECTS, URL_CREATE_PROJECT } from "../../utils/routes";
import {MainPage , AdministratorPage, NotFound404 , ManagerPage , RegisterUOPage, CreateOrgPage ,EditOrgPage, ProjectsPage, CreateProjectPage }from "../../pages";
import ProtectedRoute from "../protected-route"
import { withAuthenticationRequired } from "react-oidc-context";
import UserInfo from "../user-info/UserInfo";
import LeftMenu from "../left-menu/LeftMenu";
import accountStore from '../../services/accountsStore'
import {  useMemo, useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';
// import { Dialog } from 'primereact/dialog';
// import CreateProject from "../../pages/createProject/createProject";
// import 'primereact/resources/themes/lara-light-blue/theme.css'



const App = () => {
  //  const location = useLocation();

  //  const stateLocation = location.state && location.state.location;

  const auth = useAuth();

  const [visible, setVisible] = useState(true);


  useMemo(() => {
 
  accountStore.setState({SecondName: auth.user?.profile.family_name , 
    FirstName: auth.user?.profile.name, 
    GivenName: auth.user?.profile.given_name , 
    Email: auth.user?.profile.email ,
    password: auth.user?.profile.sid ,
    role: auth.user?.profile.role  ,
    userID:auth.user?.profile.sub,
    phone_number: auth.user?.profile.phone_number})
  },[ auth.user?.profile.email, auth.user?.profile.family_name, auth.user?.profile.given_name, auth.user?.profile.name, auth.user?.profile.phone_number, auth.user?.profile.role, auth.user?.profile.sid, auth.user?.profile.sub]);
   



  if (auth.isLoading) {
    return <Loader/>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  
  return (
    
    <PrimeReactProvider>
    <AppHeader />
    <main className="te p-0">  
      <div className="row m-0 h-100">
      <div className="col-lg-2half col-sm-12 p-0 bgWhite shadow-line">
      <span className="h90"></span>
      <ol className="block navbar-nav pt-3 w-100 shadow-menu">
       <UserInfo />
       <li className="dividerH ml-4 mr-4"></li>
       <li className="nav-link ml-2"></li>
      </ol> 
      <ol className="navbar-nav mt-3 show-desktop">  
      <LeftMenu/> 
      </ol> 
      </div>
      <div className="col-lg-9half col-sm-12 p-0 min-vh-100 bgWhite  ">
      <span className="h90"></span>
      <div className="row w-100 m-0 min-vh-100">
        {/* <Routes location={stateLocation || location}> */}
        <Routes>
          <Route path={URL_ROOT} element={<ProtectedRoute startPage = {true} element= {<MainPage />} />} />
          <Route path={URL_ANY} element={<NotFound404 />} />
          <Route path={URL_ADMINISTRATOR} element={<ProtectedRoute administrator={true} element={<AdministratorPage />} />} />
          <Route path={URL_REGISTER_UO} element={<ProtectedRoute administrator={true} element={<RegisterUOPage />} />} />
          <Route path={`${URL_REGISTER_UO}/${URL_EDIT_ORG}/:id`} element={<ProtectedRoute administrator={true} element={<EditOrgPage />} />} />
          <Route path={`${URL_REGISTER_UO}/${URL_CREATE_ORG}`} element={<ProtectedRoute administrator={true} element={<CreateOrgPage />} />} />
          <Route path={URL_PROJECTS} element={<ProtectedRoute administrator={true} element={<ProjectsPage />} />} />
          <Route path={`${URL_PROJECTS}/${URL_CREATE_PROJECT}`} element={<ProtectedRoute administrator={true} element={<CreateProjectPage />} />} />
          <Route path={URL_MANAGER} element={<ProtectedRoute manager={true}  element={<ManagerPage />} />} />
        </Routes>
        {/* {stateLocation &&
                    <Routes>
                        <Route path={`${URL_PROJECTS}/${URL_CREATE_PROJECT}`} element={
                              <Dialog visible={visible} style={{ width: '50vw'}}  dismissableMask={true} onHide={() => {if (!stateLocation) return; setVisible(false); }}>
                              <CreateProject/>
                           </Dialog>}
                             />
                       
                    </Routes>
        } */}
        </div>
      </div>
      </div>
      </main>
      </PrimeReactProvider>
    
  );
};
//auth.signinRedirect();
//return <Loader/>
//return <button onClick={() => void auth.signinRedirect()}>Log in</button>;

//export default App;
 export default withAuthenticationRequired(App, {
   OnRedirecting: () => (<div></div>)
 });