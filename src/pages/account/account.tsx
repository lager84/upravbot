import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { GET_ACCOUNTS } from '../../apollo/QLAccount';
import {TState} from "../../utils/typesTS"
import { useQuery } from '@apollo/client';
import Loader from '../../components/loader/Loader';
import { DataTable ,  DataTableFilterMeta, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { URL_CREATE_ACCOUNT, URL_EDIT_ACCOUNT } from '../../utils/routes';
import plus from "../../img/ic-plus.svg";


const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  userName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
 clientPhoneNumber: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  firstName: { value: null, matchMode: FilterMatchMode.IN },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  middleName: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  secondName: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
 role: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },

  activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
};

const AccountPage: FC = () => {

const [account, setAccount] = useState<TState[]>();
const { data, loading, error ,refetch } = useQuery(GET_ACCOUNTS);
const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
const [selectedProduct, setSelectedProduct] = useState<TState | null>(null);
const navigate = useNavigate();


     useEffect(() => {
       if (!loading ) {
         console.log(data);
         setAccount(data.usersInfo.map((comp: TState) => comp));
         initFilters();
       }
       
       
     }, [data, loading]);

     const onRowSelect = (event: DataTableSelectEvent) => {
       navigate(`${URL_EDIT_ACCOUNT}/${event.data.userId}`)
       
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
      
      const header = renderHeader();
     
     if (loading) return <Loader />;
     if (error) return <div>${error.message}</div>;
    return (
        <div className="col-lg-9half col-sm-12 p-0 min-vh-100 bgWhite  ">
   
      <div id="TableTools" className="flexHoriz w-100 m-0 p-4 ml-4">
      <h2  className="font24b textBlack ml-0 p-4">Пользователи</h2>
      <span className="h90"></span>
     
     
        <button
           onClick={() => navigate(`${URL_CREATE_ACCOUNT}`)}
          title="Добавить пользователя"
          className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"
        >
          <img src={plus} className="w16 reddishSvg" alt=""></img>
        </button>
      </div>
      
      <div className="card">
            <DataTable  value={account}  onRowSelect={onRowSelect} selectionMode="single" selection={selectedProduct} onSelectionChange={(e:any) => setSelectedProduct(e.value)} dataKey="userId" sortMode="multiple" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} filters={filters}  globalFilterFields={["userName", "secondName" , "firstName" , "middleName" , "clientPhoneNumber" , "role"]} header={header}  emptyMessage="No customers found." onFilter={(e) => setFilters(e.filters)}>
                <Column field="userName" header="Пользователь" sortable style={{ width: '30%' }}></Column>
                <Column field="secondName" header="Фамилия" sortable style={{ width: '10%' }} ></Column>
                <Column field="firstName" header="Имя" sortable style={{ width: '10%' }}></Column>
                <Column field="middleName" header="Отчество" sortable style={{ width: '10%' }}></Column>
                <Column field="clientPhoneNumber" header="Телефон" sortable style={{ width: '10%' }}></Column>
                <Column field="role" body={(rowData) => rowData.role.join('\n')} header="Роль" sortable style={{ width: '20%' }}></Column>
            </DataTable>
        </div>
      <span className="h90"></span>
    </div>
    )
}

export default AccountPage