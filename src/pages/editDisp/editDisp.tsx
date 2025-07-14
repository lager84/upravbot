import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DispObjects from "../../components/disp-objects/DispObjects";
import DispUsers from "../../components/disp-users/DispUsers";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ACCOUNTS_NO_MANAGER } from "../../apollo/QLAccount";
import accountStore from "../../services/accountsStore";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/loader/Loader";
import {
  READ_DISP_OBJECTS,
  READ_DISP_ITEM,
  UPDATE_DISP,
  DELETE_DISP,
  GET_DISP,
} from "../../apollo/QLDisp";
import { useNavigate, useParams } from "react-router-dom";
import { GET_OBJECTS } from "../../apollo/QLObjects";
import imgBin from "../../img/ic-bin.svg";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

const validationSchema = Yup.object().shape({
  disp: Yup.string().required("Необходимо ввести название диспетчерской"),
  //   users: Yup.array().of(Yup.string()).min(1, 'Нужно хотя бы одного пользователя'),
  objects: Yup.array().of(Yup.object()).min(1, "Нужно хотя бы один объект"),
});

const EditDispPage = () => {
  const navigate = useNavigate();

  const [selectDispObjects, setSelectDispObjects] = useState([]);
  const [filteredObjects, setfilteredObjects] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const accept = () => {
    // const event = new Event("click");
    handleDelete();
  };
  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Отмена",
      detail: "Вы отменили удаление диспетчерской",
      life: 3000,
    });
  };

  const handleDelete = () => {
    deleteObject({
      variables: {
        id: Number(id),
      },
    });
  };

  let { id } = useParams();

  const {
    data: data_gdi,
    loading: loading_gdi,
    error: error_gdi,
  } = useQuery(READ_DISP_ITEM, {
    variables: { id },
  });

  const initialValues = {
    disp: data_gdi?.sprDisp[0]?.dispName,
    active: data_gdi?.sprDisp[0]?.dispStatus,
    phone_disp: data_gdi?.sprDisp[0]?.phoneDisp,
    objects: selectDispObjects,
    dispetcher: data_gdi?.sprDisp[0]?.dispUsers
      .filter(
        (dispetcher: any) =>
          dispetcher.roleId === "DAA3E2D6-F57F-4906-B9C3-788B37DCA1C5"
      )
      .map((dispetcher: any) => dispetcher.userId),
    otvetstvenniy: data_gdi?.sprDisp[0]?.dispUsers
      .filter(
        (otvetstvenniy: any) =>
          otvetstvenniy.roleId === "B6FAFCA4-67E0-4CC6-ACE7-F285DEF6A0B6"
      )
      .map((dispetcher: any) => dispetcher.userId),
    ispolnitel: data_gdi?.sprDisp[0]?.dispUsers
      .filter(
        (ispolnitel: any) =>
          ispolnitel.roleId === "CD1FEC0D-7828-4C6A-8BE3-25EF9E1A12C3"
      )
      .map((dispetcher: any) => dispetcher.userId),
  };
  var userInfo = accountStore((state) => state);
  const client_ID = userInfo.userID;

  const [deleteObject, { loading: loading_del_disp, error: error_del_disp }] =
    useMutation(DELETE_DISP, {
      onCompleted: () => {
        navigate("/disp");
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GET_DISP,
          variables: {
            client_ID: client_ID,
          },
        },
      ],
    });

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
    updateDisp,
    { loading: loading_update_disp, error: error_update_disp },
  ] = useMutation(UPDATE_DISP, {
    onCompleted: () => {
      navigate(-1);
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: READ_DISP_ITEM,
        variables: {
          id: id,
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
      const selectDispObjects = data_gdi?.sprDisp[0]?.dispObjects.map(
        (gfoid: any) => gfoid.gilFindObjectsId
      );

      const filteredObjects = data_go.gilFindObjects.filter((obj: any) => {
        // Приводим selectDispObjects к массиву с защитой от undefined
        const selectedIds = Array.isArray(selectDispObjects)
          ? selectDispObjects
          : [];

        const selectfilteredObjects = data_go.gilFindObjects.filter(
          (obj: { id: number }) => selectedIds.includes(obj.id)
        );

        const isSelected = selectedIds.includes(obj.id); // Проверка выбранных домов
        const isNotOccupied = !data_disp_objects.dispObjects.some(
          (dispObj: any) => dispObj.gilFindObjectsId === obj.id
        );

        setSelectDispObjects(selectfilteredObjects);

        return isSelected || isNotOccupied;
      });

      setfilteredObjects(filteredObjects);
    }
  }, [data_go, data_disp_objects, data_gdi]);

  const handleSubmit = async (values: any, actions: any) => {
    //console.log(values);

    const normalizeUserInput = (input: any) => {
      // Приводим к массиву, если не массив
      const arr = Array.isArray(input) ? input : [input];
      return arr.map((item) => {
        if (typeof item === "string") {
          return { userId: item }; // Если это строка — оборачиваем в объект
        } else if (item?.userId) {
          return { userId: item.userId }; // Если это объект с userId — используем его
        } else {
          return item; // Иначе возвращаем как есть (на случай ошибок)
        }
      });
    };

    const dispObjects = values.objects.map((item: any) => ({
      gilFindObjectsId: item.id,
    }));

    const dispetcher = normalizeUserInput(values.dispetcher);
    const otvetstvenniy = normalizeUserInput(values.otvetstvenniy);
    const ispolnitel = normalizeUserInput(values.ispolnitel);
    //  const dispetcher =
    //  values.dispetcher.map((item:any) => ({
    //    userId: item.userId ,
    //  }));

    // const otvetstvenniy =
    // values.otvetstvenniy.map((item:any) => ({
    //    userId: item.userId,
    //  }));

    // const ispolnitel =
    //  values.ispolnitel.map((item:any) => ({
    //    userId: item.userId,
    //  }));

    updateDisp({
      variables: {
        id: Number(id),
        dispName: values.disp,
        dispStatus: values.active,
        phoneDisp: values.phone_disp,
        userId: client_ID,
        dispObjects: dispObjects,
        dispetcher: dispetcher,
        otvetstvenniy: otvetstvenniy,
        ispolnitel: ispolnitel,
      },
    });

    // try {
    //   await createForm({ variables: { input: values } });
    //   alert("Форма успешно отправлена!");
    //   actions.setSubmitting(false);
    // } catch (err) {
    //   console.error(err.message);
    //   alert("Ошибка отправки формы");
    //   actions.setSubmitting(false);
    // }
  };

  if (loading)
    return (
      <>
        <Loader />
      </>
    );
  if (error) return <>`Submission error! ${error.message}`</>;
  if (loading_update_disp)
    return (
      <>
        <Loader />
      </>
    );
  if (error_update_disp)
    return <>`Submission error! ${error_update_disp.message}`</>;
  if (loading_gdi)
    return (
      <>
        <Loader />
      </>
    );
  if (error_gdi) return <>`Submission error! ${error_gdi.message}`</>;
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
  if (loading_del_disp)
    return (
      <>
        {" "}
        <Loader />
      </>
    );
  if (error_del_disp) return <>`Submission error! ${error_del_disp.message}`</>;

  console.log(data_gdi?.sprDisp[0]?.dispStatus);

  return (
    <div className="col-lg-9 col-sm-12">
      <div className="bgWhite rounded16 p-4 shadow">
        <div className="flexHoriz w-100 mb-4">
          <h3 className="font18b mb-0">Редактирование диспетчерской</h3>
          <Toast ref={toast} position="bottom-right" />
          <ConfirmDialog
            className="modal-contentProject  bgWhite rounded16 p-4 shadow   col-12 col-lg-6"
            acceptLabel="Удалить"
            acceptClassName="btn btn1 h56 mr-2"
            rejectLabel="Отмена"
            rejectClassName="btn btn1 h56 mr-2ml-auto btn btn1 h56 outline shadow-none flexCenter CancelProject"
            group="declarative"
            visible={visible}
            onHide={() => setVisible(false)}
            message="Вы уверены что хотите удалить диспетчерскую?"
            icon="pi pi-exclamation-triangle"
            accept={accept}
            reject={reject}
          />
          <button
            id="DeleteUO"
            type="button"
            onClick={() => setVisible(true)}
            className="transp border-0 ml-auto"
          >
            <img
              src={imgBin}
              className="mr-3 position-absolute d-flex ml-n4 "
              alt=""
            ></img>
            <span id="delspan" className="font16b reddish">
              Удалить диспетчерскую
            </span>
          </button>
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
              selectDispObjects={selectDispObjects}
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
              selectUsers={
                data_gdi?.sprDisp[0]?.dispUsers
                  .filter(
                    (dispetcher: any) =>
                      dispetcher.roleId ===
                      "DAA3E2D6-F57F-4906-B9C3-788B37DCA1C5"
                  )
                  .map((dispetcher: any) => dispetcher.userId) || []
              }
            />
            <Field
              name="otvetstvenniy"
              component={DispUsers}
              users={otvetstvenniy}
              headerText="Ответственный"
              selectUsers={
                data_gdi?.sprDisp[0]?.dispUsers
                  .filter(
                    (dispetcher: any) =>
                      dispetcher.roleId ===
                      "B6FAFCA4-67E0-4CC6-ACE7-F285DEF6A0B6"
                  )
                  .map((dispetcher: any) => dispetcher.userId) || []
              }
            />
            <Field
              name="ispolnitel"
              component={DispUsers}
              users={ispolnitel}
              headerText="Исполнитель"
              selectUsers={
                data_gdi?.sprDisp[0]?.dispUsers
                  .filter(
                    (dispetcher: any) =>
                      dispetcher.roleId ===
                      "CD1FEC0D-7828-4C6A-8BE3-25EF9E1A12C3"
                  )
                  .map((dispetcher: any) => dispetcher.userId) || []
              }
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
export default EditDispPage;
