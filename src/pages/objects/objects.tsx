import styles from "../objects/objects.module.css";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Loader from "../../components/loader/Loader";
import plus from "../../img/ic-plus.svg";
import ProjectListItem from "../../components/project-list-items/Project-list-items";
import { GET_OBJECTS } from "../../apollo/QLObjects";
import accountStore from "../../services/accountsStore";

import { TsprObject } from "../../utils/typesTS";

import { useNavigate } from "react-router-dom";
//import { URL_CREATE_PROJECT } from "../../utils/routes";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-blue/theme.css"


const ObjectsPage: FC = () => {

  const [ouorg, setOUorg] = useState<TsprObject[]>();



  var userInfo = accountStore((state) => state);
 

  const client_ID = userInfo.userID;

  const navigate = useNavigate();

  const { data, loading, error ,refetch } = useQuery(GET_OBJECTS, {
    //fetchPolicy: "network-only",
    variables: { client_ID },
  });

  useEffect(() => {
    if (!loading ) {
      console.log(data);
      setOUorg(data.gilFindObjects.map((comp: TsprObject) => comp));
     
    }
    
  }, [data, loading]);

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
      <h2 className=" font24b textBlack ml-0 p-4">Объекты</h2>

      <div id="TableTools" className="flexHoriz w-100 m-0 p-4 ml-4">

        <button
          // onClick={() => navigate(`${URL_CREATE_PROJECT}`)}
          title="Добавить объект"
          className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"
        >
          <img src={plus} className="w16 reddishSvg" alt=""></img>
        </button>
      </div>
      
      <div className="card">
            <DataTable value={ouorg} sortMode="multiple" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="sprStreet.oblast" header="Область" sortable style={{ width: '10%' }}></Column>
                <Column field="sprStreet.city" header="Город" sortable style={{ width: '10%' }} ></Column>
                <Column field="sprStreet.sName" header="Улица" sortable style={{ width: '10%' }}></Column>
                <Column field="houseNumber" header="Номер дома" sortable style={{ width: '10%' }}></Column>
                <Column field="balanceCompany.name" header="Наименование организации" sortable style={{ width: '10%' }}></Column>
                <Column field="gilFindProject.projectName" header="Проект" sortable style={{ width: '10%' }}></Column>
            </DataTable>
        </div>
      {/* <div className={styles.divRoot}>
        {ouorg &&
          ouorg
            .map((detail: TsprProject) => (
              <ProjectListItem card={detail} refetch={refetch} key={detail.id} />
            ))
            .sort(sortCb(sort.sortName , 'projectName'))}
      </div> */}
      <span className="h90"></span>
    </div>
  );
};

export default ObjectsPage;
