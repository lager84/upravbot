import { useEffect, useState } from "react";
import searchImg from "../../img/search-ic.svg";

type TProp<T> = {
  card: T | undefined;
  [key: string]: number | any;
  setOUorg: (value: T) => void;
};

const InputSearch = function <T>(props: TProp<T>) {
  const [value, setValue] = useState<any>(props.card);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      props.setOUorg(search(value));
    } else {
      props.setOUorg(value);
      setValue(value);
    }
  }, [query]);

  const search_parameters = Object.keys(Object.assign({}, ...value));

  function search<T>(value: TProp<T>) {
    return value.filter((value: TProp<T>) =>
      search_parameters.some((parameter) =>
        value[parameter].toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }

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
      ></input>
    </div>
  );
};

export default InputSearch;
