import React,  { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import accountStore from '../../services/accountsStore';
import { useNavigate  } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Loader from '../loader/Loader';
import { Field, FieldProps } from 'formik';
import { FilterMatchMode } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { GET_PROJECT } from '../../apollo/QLProjects';

type Form = {
 touched: { [key: string]: boolean | boolean[] };
  errors: { [key: string]: string | string[] };
}

const DispObjects = ({ field, form , selectDispObjects , filteredObjects  }: { field: any, form: Form , selectDispObjects: any , filteredObjects:any }) => {

   const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },  
        'gilFindProject.projectName': { value:null, matchMode: FilterMatchMode.IN },
    
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

    


    const [objects, setObjects] = useState([]);
    const [selectedObjects, setSelectedObjects] = useState([]);
    const [rowClick, setRowClick] = useState(true);
    const [projects , setProjects] = useState<{ name: string, id: string }[]>([]);

    var userInfo = accountStore((state) => state);

  const client_ID = userInfo.userID;

  const navigate = useNavigate();
  



   const { data:data_projects, loading:loading_projects, error:error_projects} = useQuery(GET_PROJECT, {
    variables: { client_ID },
  });

 

  useEffect(() => {

   

        
        setSelectedObjects(selectDispObjects)
        setObjects(filteredObjects);
        setProjects(data_projects?.sprGilFindProjects.map((project:any) => ({ name: project.projectName, id: project.id })));
       
        

        
  } ,[ selectDispObjects , filteredObjects , data_projects]);

   const { name, value } = field;

     

   

 const representativeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {  
    
      return (
            <MultiSelect
                value={options.value || []}
                options={projects}
                onChange={(e: MultiSelectChangeEvent) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                optionValue="name"
                itemTemplate={(option:any) => <span>{option.name}</span>}
                placeholder="Проект"
                className="p-column-filter"
                maxSelectedLabels={4}
                style={{ minWidth: '14rem' }}
                display="chip" 
                filter
            />
        );
    };
    
  
 const header = renderHeader();



 

  if (loading_projects) return <><Loader /></>;
  if (error_projects) return <>`Submission error! ${error_projects.message}`</>;
  return (
    <div className="distributor">
 <Field name={name}>
   {({ field, form }: FieldProps) => (
 <DataTable value={objects} selectionMode={rowClick ? null : 'checkbox'} scrollHeight='400px' selection={selectedObjects} onSelectionChange={(e:any) => {setSelectedObjects(e.value); form.setFieldValue( name, e.value);}} dataKey="id" tableStyle={{ minWidth: '50rem' }}
 filters={filters} filterDisplay="row" globalFilterFields={['sprStreet.sName', 'houseNumber', 'sprStreet.oblast', 'sprStreet.city' , 'gilFindProject.projectName']} header={header} emptyMessage="Нет значений" >
                <Column selectionMode="multiple" headerStyle={{ width: '1rem' }} style={{ width: "2%" }}></Column>
                <Column
                           field="sprStreet.oblast"
                           header="Область"
                           sortable
                           style={{ width: "5%" }}
                         ></Column>
                         <Column
                           field="sprStreet.city"
                           header="Город"
                           sortable
                           style={{ width: "5%" }}
                         ></Column>
                         <Column
                           field="sprStreet.sName"
                           header="Улица"
                           sortable
                           style={{ width: "5%" }}
                         ></Column>
                         <Column
                           field="houseNumber"
                           header="Номер дома"
                           sortable
                           style={{ width: "5%" }}
                         ></Column>
                         <Column  
                          field='gilFindProject.projectName'                                     
                           header="Проект"
                           sortable
                           style={{ width: "5%" }}
                           filterField='gilFindProject.projectName'
                           showFilterMenu={false} filterMenuStyle={{ width: '14rem' }}
                           //body={representativeBodyTemplate} 
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

export default DispObjects;