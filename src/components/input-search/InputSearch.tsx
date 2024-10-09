import { useCallback, useEffect, useState } from "react";
import searchImg from "../../img/search-ic.svg";
import { useSearchParams } from "react-router-dom";

type TProp<T> = {
  card: T | undefined;
  [key: string]: number | any;
  setOUorg: (value: T) => void;
  filterValue: string;
};

const InputSearch = function <T>(props: TProp<T>) {
  const [value] = useState<any>(props.card);
  const [query, setQuery] = useState(props.filterValue);
  const [searchParams, setSearchParams] = useSearchParams();

  const search_parameters = Object.keys(Object.assign({}, ...value));

  const searchCB = useCallback(
    (value: TProp<T>) => {
      return value.filter((value: TProp<T>) =>
        search_parameters.some((parameter) =>
          value[parameter]
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      );
    },
    [search_parameters , query]
  );

  useEffect(() => {
    if (query) {
      props.setOUorg(searchCB(value));
      searchParams.set("query", query);
      setSearchParams(searchParams);
    } else {
      props.setOUorg(value);
      //setSearchParams({});
      searchParams.delete("query");
      setSearchParams(searchParams);
    }
  }, [query]);

  return (
    <div className="shadow-in border-wh mb-0 text-left w-25 h56 te-posrel rounded-lg bgLightGrey3">
      <div className="ml-2 pl-2 transp border-0">
        <img src={searchImg} className="w18" alt=""></img>
      </div>
      <input
        type="search"
        className="w-100 transp border-0 ml-2 pr-2 pt-1"
        placeholder="Найти..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      ></input>
    </div>
  );
};

export default InputSearch;
