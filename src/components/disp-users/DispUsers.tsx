import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Field, FieldProps } from "formik";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

type Form = {
  touched: { [key: string]: boolean | boolean[] };
  errors: { [key: string]: string | string[] };
};

type UsersType = {
  userId: string;
  userName: string;
  secondName: string;
  firstName: string;
  middleName: string;
  clientPhoneNumber: string;
  role: string[];
};

const DispUsers = ({
  headerText,
  users,
  selectUsers,
  field,
  form,
}: {
  headerText: string;
  selectUsers: string[];
  users: UsersType[];
  field: any;
  form: Form;
}) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="text-xl text-900 font-bold">{headerText}</span>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue || ""}
            onChange={onGlobalFilterChange}
            placeholder="Поиск"
          />
        </IconField>
      </div>
    );
  };

  const [selectedUsers, setSelectedUsers] = useState<UsersType[]>([]);
  const [rowClick] = useState(true);

  useEffect(() => {
    // Приводим selectDispObjects к массиву с защитой от undefined
    const selectedIds = Array.isArray(selectUsers) ? selectUsers : [];

    setSelectedUsers(
      users?.filter((user: any) => selectedIds.includes(user.userId))
    );
  }, [users, selectUsers]);

  const { name } = field;

  const header = renderHeader();

  return (
    <div className="distributor">
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <DataTable
            value={users}
            selectionMode={rowClick ? null : "checkbox"}
            scrollHeight="400px"
            selection={selectedUsers}
            onSelectionChange={(e: any) => {
              setSelectedUsers(e.value);
              form.setFieldValue(name, e.value);
            }}
            dataKey="userId"
            tableStyle={{ minWidth: "50rem" }}
            filters={filters}
            filterDisplay="row"
            globalFilterFields={[
              "secondName",
              "firstName",
              "middleName",
              "userName",
              "role",
            ]}
            header={header}
            emptyMessage="Нет значений"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "1rem" }}
              style={{ width: "2%" }}
            ></Column>
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

      {form.touched[field.name] && form.errors[field.name] && (
        <span style={{ color: "red" }}>{form.errors[field.name]}</span>
      )}
    </div>
  );
};

export default DispUsers;
