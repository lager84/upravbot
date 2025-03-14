import styles from "../projects/projects.module.css";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Loader from "../../components/loader/Loader";
import plus from "../../img/ic-plus.svg";
import ProjectListItem from "../../components/project-list-items/Project-list-items";
import { GET_PROJECT } from "../../apollo/QLProjects";
import accountStore from "../../services/accountsStore";
import sortStore from "../../services/sortStore";
import { TsprProject } from "../../utils/typesTS";
import InputSearch from "../../components/input-search/InputSearch";
import {
  SortingControl,
  sortCb,
} from "../../components/sorting-control/SortingControl";
import { useNavigate } from "react-router-dom";
import { URL_CREATE_PROJECT } from "../../utils/routes";

const ProjectsPage: FC = () => {
  const [isDisplayDataSet, setIsDisplayDataSet] = useState(false);
  const [ouorg, setOUorg] = useState<TsprProject[]>();



  var userInfo = accountStore((state) => state);
  var sort = sortStore((sortName) => sortName);

  const client_ID = userInfo.userID;

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_PROJECT, {
    //fetchPolicy: "cache-and-network",
    variables: { client_ID },
  });

  useEffect(() => {
    if (!loading && !isDisplayDataSet) {
      console.log(data);
      setOUorg(data.sprGilFindProjects.map((comp: TsprProject) => comp));
      setIsDisplayDataSet(true);
    }
  }, [isDisplayDataSet, ouorg, data, loading]);

  if (loading)
    return (
      <>
        <Loader />
      </>
    );

  if (error) return <>`Submission error! ${error.message}`</>;

  console.log(ouorg);

  return (
    <div className="col-lg-9half col-sm-12 p-0 min-vh-100 bgWhite  ">
      <span className="h90"></span>
      <h2 className=" font24b textBlack ml-0 p-4">Проекты</h2>

      <div id="TableTools" className="flexHoriz w-100 m-0 p-4 ml-4">
        {isDisplayDataSet && (
          <InputSearch<TsprProject[]>
            setOUorg={setOUorg}
            card={ouorg?.map(({ id, projectName }) => {
              return { id, projectName };
            })}
          />
        )}

        <SortingControl label={"Наименование проекта:"} />

        {/* <Link className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"
        to={`${URL_CREATE_PROJECT}`}
        state={{ location: location }}
      >
<img src={plus} className="w16 reddishSvg" alt=""></img>
      </Link> */}

        <button
          onClick={() => navigate(`${URL_CREATE_PROJECT}`)}
          title="gds"
          className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"
        >
          <img src={plus} className="w16 reddishSvg" alt=""></img>
        </button>
      </div>

      <div className={styles.divRoot}>
        {ouorg &&
          ouorg
            .map((detail: TsprProject) => (
              <ProjectListItem card={detail} key={detail.id} />
            ))
            .sort(sortCb(sort.sortName))}
      </div>
      <span className="h90"></span>
    </div>
  );
};

export default ProjectsPage;
