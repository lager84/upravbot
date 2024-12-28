import styles from "../registerUO/registerUO.module.css";
import { FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Loader from "../../components/loader/Loader";
import plus from "../../img/ic-plus.svg";
import UOListItem from "../../components/ou-list-items/OUi-list-items";
import { GET_UO_ORG } from "../../apollo/GetUOorg";
import accountStore from "../../services/accountsStore";
import { TBalanceCompany  } from "../../utils/typesTS";
import InputSearch from "../../components/input-search/InputSearch";
import { SortingControl } from "../../components/sorting-control/SortingControl";
import { useSearchParams } from "react-router-dom";








export const ASC = "asc";
export const DESC = "desc";
const sortCb = (nameSorting: string) => {
  if (nameSorting) {
    if (nameSorting === ASC) {
      return (a: any, b: any) =>
        a.props.card.name > b.props.card.name ? 1 : -1;
    } else {
      return (a: any, b: any) =>
        a.props.card.name > b.props.card.name ? -1 : 1;
    }
  }
};

const RegisterUOPage: FC = () => {
  const [isDisplayDataSet, setIsDisplayDataSet] = useState(false);
  const [ouorg, setOUorg] = useState<TBalanceCompany[]>();

  const [nameSorting, setNameSorting] = useState(ASC);
  const [searchParams, setSearchParams] = useSearchParams();

  const [queryFilter, setQueryFilter] = useState("");

  var userInfo = accountStore((state) => state);

  const client_ID = userInfo.userID;
  
  

  const { data, loading, error } = useQuery(GET_UO_ORG, {
    //fetchPolicy: "cache-and-network",
    variables: { client_ID }
  });

  



  useEffect(() => {
    if (!loading && !isDisplayDataSet) {
      console.log(data)
      setOUorg(data.companyBills.map((comp:any ) =>({ cBid: comp.id , ...comp.balanceCompany})));
      setIsDisplayDataSet(true);
    }
  }, [isDisplayDataSet, ouorg, data, loading]);

  useEffect(() => {
    if (searchParams.get("name") && searchParams.get("query")) {
      setNameSorting(searchParams.get("name") as SetStateAction<string>);
      setQueryFilter(searchParams.get("query") as SetStateAction<string>);
    } else if (searchParams.get("query")) {
      setQueryFilter(searchParams.get("query") as SetStateAction<string>);
    } else if (searchParams.get("name")) {
      setNameSorting(searchParams.get("name") as SetStateAction<string>);
      //setSearchParams({'name':searchParams.get("name") as string})
    }

   


    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const sortCountries = useCallback(
    (type: any) => {
      let nextSortingValue;
      switch (type) {
        case "name": {
          nextSortingValue = nameSorting
            ? nameSorting === ASC
              ? DESC
              : ASC
            : ASC;
          break;
        }

        default: {
          break;
        }
      }
      setSearchParams(
        searchParams.get("query")
          ? {
              query: searchParams.get("query") as string,
              [type]: nextSortingValue as any,
            }
          : { [type]: nextSortingValue as any }
      );
    },
    [nameSorting, setSearchParams, searchParams]
  );







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
        {isDisplayDataSet && (
          <InputSearch<TBalanceCompany[]>
            filterValue={queryFilter}
            setOUorg={setOUorg}
            card={ouorg}
          />
        )}

        <SortingControl
          label={"Наименование организации:"}
          onSort={() => sortCountries("name")}
          value={nameSorting}
        />

        <button
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
            .sort(sortCb(nameSorting))}
      </div>
      <span className="h90"></span>
    </div>
  );
};

export default RegisterUOPage;
