import React,  { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import accountStore from '../../services/accountsStore';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNTS_NO_MANAGER } from '../../apollo/QLAccount';

import Loader from '../loader/Loader';
import { READ_DISP_OBJECTS } from '../../apollo/QLDisp';
import { Field, FieldProps } from 'formik';
import { FilterMatchMode } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { GET_PROJECT } from '../../apollo/QLProjects';
import { Roles } from '../../utils/roles';

type Form = {
 touched: { [key: string]: boolean | boolean[] };
  errors: { [key: string]: string | string[] };
}



const DispUsers = ({ field, form }: { field: any, form: Form }) => {

   const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },  
        role: { value:null, matchMode: FilterMatchMode.IN },
    
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');

      const onGlobalFilterChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        
        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

        const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue || '' } onChange={onGlobalFilterChange} placeholder="Поиск" />
                </IconField>
            </div>
        );
    };

    


    const [users, setUsers] = useState([]);
    const [selectedObjects, setSelectedObjects] = useState([]);
    const [rowClick, setRowClick] = useState(true);
    const [roles , setRoles] = useState<{ name: string, id: string }[]>([]);

    var userInfo = accountStore((state) => state);

  const client_ID = userInfo.userID;

  const navigate = useNavigate();
  
  const { data, loading, error} = useQuery(GET_ACCOUNTS_NO_MANAGER, {
    variables: { client_ID },
  });



  

  useEffect(() => {

    if (data?.usersInfo) {
        
        
        setUsers(data?.usersInfo);
        setRoles(Roles.map((roles:any) => ({ name: roles.name, id: roles.key })).filter((roles:any)=>roles.id !== "50C5D24A-D585-473C-82B2-411DA4120FA5"));
        
        
  }} ,[data]);

   const { name, value } = field;

     

   

 const representativeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {  
   console.log(options.value)
      return (
            <MultiSelect
                value={options.value}
                options={roles}
                onChange={(e: MultiSelectChangeEvent) => options.filterApplyCallback(e.value )}
                optionLabel="name"
                optionValue="name"
                itemTemplate={(option:any) => <span>{option.name}</span>}
                placeholder="Роль"
                className="p-column-filter"
                maxSelectedLabels={4}
                style={{ minWidth: '14rem' }}
                display="chip" 
                filter
            />
        );
    };
    
  
 const header = renderHeader();

 

  if (loading) return <><Loader /></>;
  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <div className="distributor">
 <Field name={name}>
   {({ field, form }: FieldProps) => (
 <DataTable value={users} selectionMode={rowClick ? null : 'checkbox'} scrollHeight='400px' selection={selectedObjects} onSelectionChange={(e:any) => {setSelectedObjects(e.value); form.setFieldValue( name, e.value);}} dataKey="userId" tableStyle={{ minWidth: '50rem' }}
 filters={filters} filterDisplay="row" globalFilterFields={['secondName', 'firstName', 'middleName', 'userName' , 'role']} header={header} emptyMessage="Нет значений" >
                <Column selectionMode="multiple" headerStyle={{ width: '1rem' }} style={{ width: "2%" }}></Column>
                <Column
                           field="secondName"
                           header="Фамилия"
                           sortable
                           style={{ width: "10%" }}
                         ></Column>
                         <Column
                           field="firstName"
                           header="Имя"
                           sortable
                           style={{ width: "10%" }}
                         ></Column>
                         <Column
                           field="middleName"
                           header="Отчество"
                           sortable
                           style={{ width: "10%" }}
                         ></Column>
                         <Column
                           field="userName"
                           header="Email"
                           sortable
                           style={{ width: "30%" }}
                         ></Column>
                         <Column  
                          field="role"                                     
                           header="Роль"
                           sortable
                           style={{ width: "20%" }}
                           filterField="role"
                           showFilterMenu={false} filterMenuStyle={{ width: '14rem' }}
                           body={(rowData) => rowData.role.join("\n")} 
                           filter 
                           filterElement={representativeRowFilterTemplate}                           
                         ></Column>
                         
            </DataTable>
            )}
</Field>
        {/* <label htmlFor={name}>
        Наименование:
        <Field name={name} as="input" type="text"/>
      </label>
        <br/>
      <label htmlFor={`${name}-checkbox`}>
        Активна:
        <Field name={`${name}-checkbox`} type="checkbox" id={`${name}-checkbox`}/>
      </label> */}
   
      {form.touched[field.name] && form.errors[field.name] &&
        <span style={{ color: 'red' }}>{form.errors[field.name]}</span>}
    </div>
  );
};

export default DispUsers;