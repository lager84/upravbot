import { NavLink, useLocation } from "react-router-dom";
import { FC } from "react";

type TProps = {
  href: string;
  children: string;
  icon: string;
};

const LeftMenuIcon: FC<TProps> = ({ icon, href, children }) => {
  const location = useLocation();

  const activeURL = () => {
    //if (href === location.pathname) 
    if (location.pathname.includes(href)) 
    {
      
      return true;
      
    }
  };

  

  return (
    <li className={activeURL() ? "nav-link active" : "nav-link"}>
      <NavLink to={href} className="flexHoriz">
        <img className="w24 mr-3" src={icon} alt=""></img>
        <p className="font14b mb-0">{children}</p>
      </NavLink>
    </li>
  );
};

export default LeftMenuIcon;
