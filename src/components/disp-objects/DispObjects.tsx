import React,  { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import accountStore from '../../services/accountsStore';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_OBJECTS } from '../../apollo/QLObjects';

import Loader from '../loader/Loader';
import { READ_DISP_OBJECTS } from '../../apollo/QLDisp';
import { Field, FieldProps } from 'formik';

type Form = {
 touched: { [key: string]: boolean | boolean[] };
  errors: { [key: string]: string | string[] };
}

const DispObjects = ({ field, form }: { field: any, form: Form }) => {

    const [objects, setObjects] = useState([]);
    const [selectedObjects, setSelectedObjects] = useState([]);
    const [rowClick, setRowClick] = useState(true);

    var userInfo = accountStore((state) => state);

  const client_ID = userInfo.userID;

  const navigate = useNavigate();
  
  const { data, loading, error} = useQuery(GET_OBJECTS, {
    variables: { client_ID },
  });

  const { data:data_disp_objects, loading:loading_disp_objects, error: error_disp_objects} = useQuery(READ_DISP_OBJECTS);

  useEffect(() => {

    if (data?.gilFindObjects && data_disp_objects?.dispObjects) {
        const filteredObjects = data.gilFindObjects.filter((obj:any) => 
            data_disp_objects.dispObjects.some((dispObj:any) => dispObj.gilFindObjectsId !== obj.id)
        );
        setObjects(filteredObjects);

  }} ,[data , data_disp_objects]);

   const { name, value } = field;



console.log(selectedObjects)


  if (loading) return <><Loader /></>;
  if (error) return <>`Submission error! ${error.message}`</>;
  if (loading_disp_objects) return <> <Loader /></>;
  if (error_disp_objects) return <>`Submission error! ${error_disp_objects.message}`</>;
  return (
    <div className="distributor">
 <Field name={name}>
   {({ field, form }: FieldProps) => (
 <DataTable value={objects} selectionMode={rowClick ? null : 'checkbox'} scrollHeight='400px' selection={selectedObjects} onSelectionChange={(e:any) => {setSelectedObjects(e.value); form.setFieldValue( name, e.value);}} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
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