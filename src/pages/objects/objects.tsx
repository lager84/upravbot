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
import { DataTable ,  DataTableFilterMeta, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from "primereact/button";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { URL_CREATE_OBJECT, URL_EDIT_OBJECT } from "../../utils/routes";
//import "primereact/resources/themes/lara-light-blue/theme.css"


const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'sprStreet.oblast': {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  'sprStreet.city': {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
 'sprStreet.sName': {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  houseNumber: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
};


const ObjectsPage: FC = () => {

  const [ouorg, setOUorg] = useState<TsprObject[]>();
  
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<TsprObject | null>(null);


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
      initFilters();
    }
    
    
  }, [data, loading]);

  const clearFilter = () => {
    initFilters();
};

const onRowSelect = (event: DataTableSelectEvent) => {
  navigate(`${URL_EDIT_OBJECT}/${event.data.id}`)
  //toast.current?.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${event.data.name}`, life: 3000 });
};

const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  let _filters = { ...filters };

  // @ts-ignore
  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};

const initFilters = () => {
  setFilters(defaultFilters);
  setGlobalFilterValue('');
};

const renderHeader = () => {
  return (
      <div className="flex justify-content-between">
          <IconField iconPosition="left">
              <InputIcon className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Поиск" />
          </IconField>
      </div>
  );
};

  if (loading)
    return (
      <>
        <Loader />
      </>
    );

  if (error) return <>`Submission error! ${error.message}`</>;

  const header = renderHeader();

  return (
    <div className="col-lg-9half col-sm-12 p-0 min-vh-100 bgWhite  ">
   
      <div id="TableTools" className="flexHoriz w-100 m-0 p-4 ml-4">
      <h2  className="font24b textBlack ml-0 p-4">Объекты</h2>
      <span className="h90"></span>
     
     
        <button
           onClick={() => navigate(`${URL_CREATE_OBJECT}`)}
          title="Добавить объект"
          className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"
        >
          <img src={plus} className="w16 reddishSvg" alt=""></img>
        </button>
      </div>
      
      <div className="card">
            <DataTable  value={ouorg}  onRowSelect={onRowSelect} selectionMode="single" selection={selectedProduct} onSelectionChange={(e:any) => setSelectedProduct(e.value)} dataKey="id" sortMode="multiple" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} filters={filters}  globalFilterFields={['sprStreet.oblast', 'sprStreet.city', 'sprStreet.sName', 'houseNumber', 'balanceCompany.name' , 'gilFindProject.projectName']} header={header}  emptyMessage="No customers found." onFilter={(e) => setFilters(e.filters)}>
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
