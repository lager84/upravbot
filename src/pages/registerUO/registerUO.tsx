import styles from "../registerUO/registerUO.module.css";
import { FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Loader from "../../components/loader/Loader";
import plus from "../../img/ic-plus.svg";
import UOListItem from "../../components/ou-list-items/OUi-list-items";
import { GET_UO_ORG } from "../../apollo/GetUOorg";
import accountStore from "../../services/accountsStore";
import { TBalanceCompany } from "../../utils/typesTS";
import InputSearch from "../../components/input-search/InputSearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { URL_CREATE_ORG } from "../../utils/routes";
import sortStore from "../../services/sortStore";
import {
  SortingControl,
  sortCb,
} from "../../components/sorting-control/SortingControl";

const RegisterUOPage: FC = () => {
  
  const [ouorg, setOUorg] = useState<TBalanceCompany[]>();

  var userInfo = accountStore((state) => state);
  var sort = sortStore((sortName) => sortName);

  const client_ID = userInfo.userID;

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_UO_ORG, {
    //fetchPolicy: "cache-and-network",
    variables: { client_ID },
  });

  useEffect(() => {
    if (!loading ) {
      console.log(data);
      setOUorg(
        data.companyBills.map((comp: any) => ({
          cBid: comp.id,
          ...comp.balanceCompany,
        }))
      );
     
    }
  }, [ data, loading]);

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

      <div id="TableTools" className="flexHoriz w-100 m-0 p-4 ml-4">
        {ouorg && (
          <InputSearch<TBalanceCompany[]> setOUorg={setOUorg} card={ouorg} />
        )}

        <SortingControl  label={"Наименование организации:"} />

        <button
          onClick={() => navigate(`${URL_CREATE_ORG}`)}
          title="gds"
          className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"
        >
          <img src={plus} className="w16 reddishSvg" alt=""></img>
        </button>
      </div>

      <div className={styles.divRoot}>
        {ouorg &&
          ouorg
            .map((detail: TBalanceCompany) => (
              <UOListItem card={detail} key={detail.id} />
            ))
            .sort(sortCb(sort.sortName,'name'))}
      </div>
      <span className="h90"></span>
    </div>
  );
};

export default RegisterUOPage;
