import { URL_CREATE_DISP, URL_EDIT_DISP } from "../../utils/routes";
import plusIcon from "../../img/ic-plus.svg";
import userIcon from "../../img/disp1.png";
import userIcon_not_active from "../../img/disp2.png";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { sprDisp } from "../../utils/typesTS";
import accountStore from "../../services/accountsStore";
import { useQuery } from "@apollo/client";
import { GET_DISP } from "../../apollo/QLDisp";
import Loader from "../../components/loader/Loader";


const DispListItems : FC = () => {

    const [disp , setDisp] = useState<sprDisp[]>([]);
    
    var userInfo = accountStore((state) => state);
    const client_ID = userInfo.userID;

     const { data, loading, error} = useQuery(GET_DISP, {
         //fetchPolicy: "network-only",
         variables: { client_ID }
     
       });

       useEffect (() => {
        setDisp(data?.sprDisp)
    }, [data])


    const navigate = useNavigate();

    
  if (loading) return <Loader />;
  if (error) return <div>${error.message}</div>;

    return (
        <>
         <div className="col-lg-4 col-md-6 col-sm-12 mb-3 cursor" onClick={() => navigate(`${URL_CREATE_DISP}`)}>
                            <div  className="dispPlus row m-0 bgWhite rounded16 shade  p-4 ">
                                <div className="col-md-12 col-sm-12 pl-0 pr-1 column-flex align-items-center">
                                    <img src={plusIcon} className="w120 h-175 cursor reddishSvg" alt=""></img>
                                    <button className="btn3 btn1 h48 w-100 outline shadow-none"><span>Создать</span></button>
                                </div>
                            </div>
                        </div>
{disp && disp.map((dispItem) => { return(
                        <div key={dispItem.id} onClick={() =>  navigate(`${URL_EDIT_DISP}/${dispItem.id}`) } className="col-lg-4 col-md-6 col-sm-12 mb-3 cursor"> 
                        <div className="row m-0 bgWhite rounded16 shade  p-4 "> 
                        <div className="col-md-12 col-sm-12 pl-0 pr-1 column-flex align-items-center"> 
                        <img src={dispItem.dispStatus? userIcon : userIcon_not_active} className="w177 cursor" alt=""></img>
                         <button className="btn3 btn1 h48 w-100 outline shadow-none"><span>{dispItem.dispName}</span></button> 
                         </div> 
                         </div> 
                         </div>
)})}
                        </>
    )
                        
}

export default DispListItems