import React from 'react';
import { Field } from 'formik';

type Form = {
 touched: { [key: string]: boolean | boolean[] };
  errors: { [key: string]: string | string[] };
}

const Disp = ({ field, form }: { field: any, form: Form }) => {

   const { name, value } = field;
  return (
    <div className="distributor">

        <label htmlFor={name}>
        Наименование:
        <Field name={name} as="input" type="text"/>
      </label>
        <br/>
      <label htmlFor={`${name}-checkbox`}>
        Активна:
        <Field name={`${name}-checkbox`} type="checkbox" id={`${name}-checkbox`}/>
      </label>
   
      {form.touched[field.name] && form.errors[field.name] &&
        <span style={{ color: 'red' }}>{form.errors[field.name]}</span>}
    </div>
  );
};

export default Disp;