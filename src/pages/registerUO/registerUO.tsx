import styles from "../registerUO/registerUO.module.css";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import Loader from "../../components/loader/Loader";
import plus from "../../img/ic-plus.svg";
import UOListItem from "../../components/ou-list-items/OUi-list-tems";
import { GET_UO_ORG } from "../../apollo/GetUOorg";
import accountStore from "../../services/accountsStore";
import { TBalanceCompany } from "../../utils/typesTS";
import InputSearch from "../../components/input-search/InputSearch";

const RegisterUOPage: FC = () => {
  const [isDisplayDataSet, setIsDisplayDataSet] = useState(false);
  const [ouorg, setOUorg] = useState<TBalanceCompany[]>();

  var userInfo = accountStore((state) => state);

  const client_ID = userInfo.userID;

  const { data, loading, error } = useQuery(GET_UO_ORG, {
    variables: { client_ID },
  });

  useEffect(()=>{
if (!loading && !isDisplayDataSet){
      setOUorg(data.balanceCompany);
      setIsDisplayDataSet(true) 
    }
    }, [isDisplayDataSet, ouorg, data, loading])
    

  if (loading)
    return (
      <>
        <Loader />
      </>
    );

  if (error) return <>`Submission error! ${error.message}`</>;

  
  return (
  
    <div className="col-lg-9half col-sm-12 p-0 min-vh-100 bgWhite  ">
      <span className="h90"></span>
      <h2 className=" font24b textBlack ml-0 p-4">Управляющие организации</h2>   

      <div id="TableTools" className="flexHoriz w-100 m-0 p-4">
         {isDisplayDataSet&&
         <InputSearch<TBalanceCompany[]> setOUorg={setOUorg} card={ouorg} /> 
        }
        <button
          title="gds"
          className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"
        >
          <img src={plus} className="w16 reddishSvg" alt=""></img>
        </button>
      </div>

      <div className={styles.divRoot}>
        {ouorg &&
          ouorg.map((detail: TBalanceCompany) => (
            <UOListItem card={detail} key={detail.id} />
          ))}
      </div>
    </div>
  );
};

export default RegisterUOPage;
