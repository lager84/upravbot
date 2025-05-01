import { FC, SetStateAction, useCallback, useEffect, useState } from "react";
import sorting_asc from "../../img/sort_asc.png";
import sorting_desc from "../../img/sort_desc.png";
import styles from "../sorting-control/sorting-control.module.css";
import { useSearchParams } from "react-router-dom";
import sortStore from "../../services/sortStore";

type SortingControlProps = {
  label: string;
};

export const ASC = "asc";
export const DESC = "desc";
export const sortCb = (nameSorting: string, sortField: string) => {
  if (nameSorting) {
    if (nameSorting === ASC) {
      return (a: any, b: any) =>
        a.props.card[sortField] > b.props.card[sortField] ? 1 : -1;
    } else {
      return (a: any, b: any) =>
        a.props.card[sortField] > b.props.card[sortField] ? -1 : 1;
    }
  }
};

export const SortingControl: FC<SortingControlProps> = ({ label }) => {
  const [nameSorting, setNameSorting] = useState(ASC);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("name") && searchParams.get("query")) {
      setNameSorting(searchParams.get("name") as SetStateAction<string>);
    } else if (searchParams.get("name")) {
      setNameSorting(searchParams.get("name") as SetStateAction<string>);
      //setSearchParams({'name':searchParams.get("name") as string})
    }

    //setSearchParams(searchParams);

    sortStore.setState({ sortName: nameSorting });
  }, [searchParams, setSearchParams, nameSorting]);

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

  return (
    <div className={styles.divRoot} onClick={() => sortCountries("name")}>
      <p>
        <span className="font14b mb-0 mr-2">{label}</span>
      </p>
      <img
        src={nameSorting.toLowerCase() === ASC ? sorting_asc : sorting_desc}
        alt={`Сортировать по : ${nameSorting}`}
        style={{
          transform:
            nameSorting.toLowerCase() === ASC ? "sorting_asc" : "sorting_desc",
        }}
      />
    </div>
  );
};
