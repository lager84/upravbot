import { FC, useEffect, useRef, useState } from "react";
import { TsprProject } from "../../utils/typesTS";
import styles from "./Projectlistitems.module.css";
import InputComponent from "../imput-component/InputComponent";
import OutsideClickHandler from "react-outside-click-handler";
import saveImg from "../../img/ic_terms.png"
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT, UPDATE_PROJECT , GET_PROJECT } from "../../apollo/QLProjects";
import Loader from "../loader/Loader";
import accountStore from "../../services/accountsStore";

type TProp = {
  card: TsprProject;
  refetch: () => void;
 
};
const ProjectListItem: FC<TProp> = ({ card , refetch }) => {

  const [disable , setDisable] = useState<boolean>(true);
  var userInfo = accountStore((state) => state);

  const [project, setProject] = useState<TsprProject>({
    id: "",
    projectName: "",
    client_id: ""
  })

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Execute the mutation
    updateProject({
      variables: {
        id:infoProject.id,
        projectName:infoProject.projectName,
        client_id:userInfo.userID     
      },
    });
  };

   const [
    updateProject,
      { data: data_upd_Pr, loading: loading_upd_Pr, error: error_upd_Pr },
    ] = useMutation(UPDATE_PROJECT
      , {
      onCompleted: () => {
        setDisable(!disable);
      },
    }
  );

    
    
    
    const handleDelete = (event: any) => {
      event.preventDefault();

    deleteProject({
      variables: {
        id:infoProject.id
      }
 
    }).then(()=>{refetch()});
  };
  

    const [
      deleteProject,
        { data: data_del_Pr, loading: loading_del_Pr, error: error_del_Pr },
      ] = useMutation(DELETE_PROJECT 
        // ,{
        // update: (cache, {data}) => {
        //   cache.evict({
        //     id: cache.identify({
        //       __typename: 'sprGilFindProjects',
        //       id: data?.deleteProject?.id,
        //     }),
        //   });
        // },
      //}
    );

  

 

   const [infoProject, setInfoProject] = useState<TsprProject>({
      id: card.id,
      projectName: card.projectName,
      client_id: card.client_id,
    });


  const onChange = (event: any) => {
    const { name, value } = event.target;
    setInfoProject((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onDisable = () => {
   
        setDisable(!disable);
 
  };



  if (loading_upd_Pr) return <Loader />;
  if (error_upd_Pr) return <div>${error_upd_Pr.message}</div>;
  if (loading_del_Pr) return <Loader />;
  if (error_del_Pr) return <div>${error_del_Pr.message}</div>;

  return (
    // <div className={styles.divCard} onClick={() => navigate(`${URL_EDIT_ORG}/${card.cBid}`)}>
    <OutsideClickHandler
    onOutsideClick={() => {
      setDisable(true);
    }}
  >
    <div className={styles.divCard} >
    
      
    <InputComponent
              type="text"
              onChange={onChange}
              value={infoProject.projectName}
              children=""
              name="projectName"
              classCss={styles.inputList}
              id_name="PROJECT"
              required={true}
              disabled={disable}
            />
    


     
    {disable && <button className="administrator_button__WAzsm" type="button" title="редактировать" onClick={onDisable}>
    <img src="/static/media/tasks-ic-bl.3e35cee28294ee173b3c7a76f6cf3529.svg" className="w24 reddishSvg mr-2 ml-2" alt=""></img>
    </button>}

    {!disable && <button className="administrator_button__WAzsm" type="button" title="редактировать" onClick={handleSubmit}>
    <img src={saveImg} className="w24 reddishSvg mr-2 ml-2" alt=""></img>
    </button>}
 
    <button id="DeletePr"  type="button" className="administrator_button__WAzsm"  title="удалить" onClick={handleDelete}>
      <img src="/static/media/ic-bin.b2f853337f6ee57b98d1fd97194cbe3c.svg" className="w24 reddishSvg mr-2 ml-2" alt=""></img>
      </button>
      
  
    </div>
    </OutsideClickHandler>

  );
};

export default ProjectListItem;
