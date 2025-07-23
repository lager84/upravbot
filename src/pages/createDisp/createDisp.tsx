import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DispObjects from "../../components/disp-objects/DispObjects";
import DispUsers from "../../components/disp-users/DispUsers";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ACCOUNTS_NO_MANAGER } from "../../apollo/QLAccount";
import accountStore from "../../services/accountsStore";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { CREATE_DISP, GET_DISP, READ_DISP_OBJECTS } from "../../apollo/QLDisp";
import { useNavigate } from "react-router-dom";
import { GET_OBJECTS } from "../../apollo/QLObjects";

const validationSchema = Yup.object().shape({
  disp: Yup.string().required("Необходимо ввести название диспетчерской"),
  //   users: Yup.array().of(Yup.string()).min(1, 'Нужно хотя бы одного пользователя'),
  objects: Yup.array().of(Yup.object()).min(1, "Нужно хотя бы один объект"),
});

const CreateDispPage = () => {
  const [filteredObjects, setfilteredObjects] = useState([]);

  const navigate = useNavigate();

  const initialValues = {
    disp: "",
    active: true,
    phone_disp: "",
    objects: [],
    dispetcher: [],
    otvetstvenniy: [],
    ispolnitel: [],
  };
  var userInfo = accountStore((state) => state);

  const client_ID = userInfo.userID;

  const {
    data: data_go,
    loading: loading_go,
    error: error_go,
  } = useQuery(GET_OBJECTS, {
    variables: { client_ID },
  });

  const {
    data: data_disp_objects,
    loading: loading_disp_objects,
    error: error_disp_objects,
  } = useQuery(READ_DISP_OBJECTS);

  const { data, loading, error } = useQuery(GET_ACCOUNTS_NO_MANAGER, {
    variables: { client_ID },
  });

  const [
    createDisp,
    { loading: loading_create_disp, error: error_create_disp },
  ] = useMutation(CREATE_DISP, {
    onCompleted: () => {
      navigate(-1);
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_DISP,
        variables: {
          client_ID: client_ID, 
        },
      },
      {
        query: READ_DISP_OBJECTS,
      },
    ],
  });

  const [dispetcher, setDispetcher] = useState([]);
  const [otvetstvenniy, setOtvetstvenniy] = useState([]);
  const [ispolnitel, setIspolnitel] = useState([]);

  useEffect(() => {
    if (data?.usersInfo) {
      setDispetcher(
        data?.usersInfo.filter((item: any) => item.role.includes("Диспетчер"))
      );
      setOtvetstvenniy(
        data?.usersInfo.filter((item: any) =>
          item.role.includes("Ответственный")
        )
      );
      setIspolnitel(
        data?.usersInfo.filter((item: any) => item.role.includes("Исполнитель"))
      );
    }
  }, [data]);

  useEffect(() => {
    if (data_go?.gilFindObjects && data_disp_objects?.dispObjects) {
      const filteredObjects = data_go.gilFindObjects.filter((obj: any) =>
        data_disp_objects.dispObjects.every(
          (dispObj: any) => dispObj.gilFindObjectsId !== obj.id
        )
      );

      setfilteredObjects(filteredObjects);
    }
  }, [data_go, data_disp_objects]);

  const handleSubmit = async (values: any, actions: any) => {

    const dispObjects = values.objects.map((item: any) => ({
      gilFindObjectsId: item.id,
    }));

    const dispetcher = values.dispetcher.map((item: any) => ({
      userId: item.userId,
    }));

    const otvetstvenniy = values.otvetstvenniy.map((item: any) => ({
      userId: item.userId,
    }));

    const ispolnitel = values.ispolnitel.map((item: any) => ({
      userId: item.userId,
    }));

    createDisp({
      variables: {
        dispName: values.disp,
        dispStatus: values.active,
        phoneDisp: values.phone_disp,
        dispObjects: dispObjects,
        dispetcher: dispetcher,
        otvetstvenniy: otvetstvenniy,
        ispolnitel: ispolnitel,
      },
    });

    
  };

  if (loading)
    return (
      <>
        <Loader />
      </>
    );
  if (error) return <>`Submission error! ${error.message}`</>;
  if (loading_create_disp)
    return (
      <>
        <Loader />
      </>
    );
  if (error_create_disp)
    return <>`Submission error! ${error_create_disp.message}`</>;
  if (loading_go)
    return (
      <>
        <Loader />
      </>
    );
  if (error_go) return <>`Submission error! ${error_go.message}`</>;
  if (loading_disp_objects)
    return (
      <>
        {" "}
        <Loader />
      </>
    );
  if (error_disp_objects)
    return <>`Submission error! ${error_disp_objects.message}`</>;

  return (
    <div className="col-lg-9 col-sm-12">
      <div className="bgWhite rounded16 p-4 shadow">
        <div className="flexHoriz w-100 mb-4">
          <h3 className="font18b mb-0">Создание диспетчерской</h3>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flexHoriz justify-content-between mt-3">
              <div className="posRel h56 rounded-lg w-100">
                <Field name="disp" type="text" className="DispName" />
                <label className="transp backLab" htmlFor="disp">
                  Название диспетчерской
                </label>
              </div>
            </div>
            <div className="posRel h56 rounded-lg w-100">
              <Field name="phone_disp" type="text" className="DispName" />
              <label className="transp backLab" htmlFor="phone_disp">
                Телефон диспетчерской
              </label>
            </div>
            <div>
              <Field
                name="active"
                id="active"
                type="checkbox"
                className="checkbox-item"
              />
              <label htmlFor="active" className="mb-3">
                Активна
              </label>
            </div>
            <div className="row mt-3 mb-3">
              <div className="flexHoriz w-100 mt-4">
                <button
                  className="btn btn1 mr-3 genBtn addBtn"
                  onClick={() => navigate("/objects/createObject")}
                  type="button"
                  style={{ float: "right" }}
                >
                  Создать объект
                </button>
              </div>
            </div>
            <Field
              name="objects"
              component={DispObjects}
              filteredObjects={filteredObjects}
            />
            <div className="row mt-3 mb-3">
              <div className="flexHoriz w-30 mb-3">
                <button
                  className="btn btn1 mr-3 genBtn addBtn"
                  onClick={() => navigate("/account/createAccount")}
                  type="button"
                  style={{ float: "right" }}
                >
                  Создать учетную запись
                </button>
              </div>
            </div>
            <Field
              name="dispetcher"
              component={DispUsers}
              users={dispetcher}
              headerText="Диспетчер"
            />
            <Field
              name="otvetstvenniy"
              component={DispUsers}
              users={otvetstvenniy}
              headerText="Ответственный"
            />
            <Field
              name="ispolnitel"
              component={DispUsers}
              users={ispolnitel}
              headerText="Исполнитель"
            />
            {/* <Disp field={getFieldProps('disp')} form={{ touched, errors }} /> */}
            {/* <Field component={Users} label="Пользователи"/>
          <Field component={Objects} label="Объекты"/> */}
            <div className="row mt-3 mb-3">
              <div className="col-sm-12">
                <button type="submit" className="btn btn1 h56 mr-2">
                  <strong>Сохранить изменения</strong>
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default CreateDispPage;
