import InputComponent from "../../components/imput-component/InputComponent";
import { FC, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { TsprProject } from "../../utils/typesTS";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import accountStore from "../../services/accountsStore";
import { URL_PROJECTS } from "../../utils/routes";
import { CREATE_PROJECT, GET_PROJECT } from "../../apollo/QLProjects";


type TState = TsprProject;

const CreateOrg: FC = () => {
  const navigate = useNavigate();

  var userInfo = accountStore((state) => state);

  const [infoProject, setInfoProject] = useState<TState>({
    id: "",
    projectName: "",
    client_id: "",
  });

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setInfoProject((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const { id, projectName, client_id } = infoProject;

    // Execute the mutation
    createProject({
      variables: {
        projectName,
        client_ID: userInfo.userID,
      },
      awaitRefetchQueries: true,
      refetchQueries: [GET_PROJECT, "SprGilFindProjects"],
    });
  };

  const [createProject, { data, loading, error }] = useMutation(
    CREATE_PROJECT,
    {
      onCompleted: () => {
        navigate(-1);
      },
    }
  );



  if (loading) return <Loader />;
  if (error) return <div>${error.message}</div>;

  return (
    <div className="col-sm-12 p-0">
      <div className="row p-4 m-0">
        <div className="col-lg-6 col-sm-12">
          <form
            className="bgWhite rounded16 shadow w-100 p-4"
            onSubmit={handleSubmit}
          >
            <div className="flexHoriz w-100">
              <h2 className="font24b textBlack">Создание Проекта</h2>
            </div>

            <InputComponent
              type="text"
              onChange={onChange}
              value={infoProject.projectName}
              children="Проекты*"
              name="projectName"
              classCss="project"
              id_name="PROJECT"
              required={true}
            />

            <div className="row mt-3 mb-3">
              <div className="col-sm-12">
                <button className="btn btn1 h56 mr-2" type="submit">
                  <strong>Сохранить</strong>
                </button>
                <button
                  onClick={() => navigate(`${URL_PROJECTS}`)}
                  type="button"
                  className="btn btn1 h56 outline shadow-none flexCenter"
                  id="backUo"
                >
                  Назад
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrg;
