import { useAuth } from "react-oidc-context";
import Loader from "./loader/Loader";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AccessDenied } from "../pages";

type TProps = {
  element: React.ReactElement;
  startPage?: boolean;
  administrator?: boolean;
  manager?: boolean;
  gitel?: boolean;
};

const ProtectedRoute: FC<TProps> = ({
  element,
  startPage = false,
  administrator = false,
  manager = false,
  gitel = false,
}) => {
  let location = useLocation();
  const auth = useAuth();

  if (auth.isLoading) {
    return <Loader />;
  }

  if (auth.isAuthenticated && !auth.user?.profile.role) {
    return <AccessDenied />;
  }

  //const userHasRequiredRole = auth.user && roles.includes(auth.user.profile.role) ? true : false;

  if (auth.isAuthenticated && auth.user?.profile.role) {
    const adminRole = auth.user?.profile.role?.includes("Администратор");
    const managerRole = auth.user?.profile.role?.includes("Менеджер");
   // const gitelRole = auth.user?.profile.role?.includes("Житель");

    if (adminRole && startPage) {
      return <Navigate to="/administrator" state={{ from: location }} />;
    }
    if (managerRole && startPage) {
      return <Navigate to="/manager" state={{ from: location }} />;
    }
    if (administrator && adminRole && !startPage) {
      return element;
    }
    if (manager && managerRole && !startPage) {
      return element;
    }
    return <AccessDenied />;
  }

  return element;
};

export default ProtectedRoute;
//    export default withAuthenticationRequired(ProtectedRoute, {
//    OnRedirecting: () => (<div>Перенаправляем на страницу логина</div>)
//  });
