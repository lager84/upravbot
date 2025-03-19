import { FC,  useRef, useState } from "react";
import { TsprProject } from "../../utils/typesTS";
import styles from "./Projectlistitems.module.css";
import InputComponent from "../imput-component/InputComponent";
import OutsideClickHandler from "react-outside-click-handler";
import saveImg from "../../img/ic_terms.png"
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT, UPDATE_PROJECT  } from "../../apollo/QLProjects";
import Loader from "../loader/Loader";
import accountStore from "../../services/accountsStore";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-blue/theme.css'


type TProp = {
  card: TsprProject;
  refetch: () => void;
 
};
const ProjectListItem: FC<TProp> = ({ card , refetch }) => {

  const [disable , setDisable] = useState<boolean>(true);
  var userInfo = accountStore((state) => state);
  
  const toast = useRef<Toast>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const accept =  () => {
    
    const event = new Event('click');
    handleDelete();
   
}

const reject = () => {
    toast.current?.show({ severity: 'warn', summary: 'Отмена', detail: 'Вы отменили удаление проекта', life: 3000 });

}


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

    
    
    
    const handleDelete = () => {
   

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
    
    <Toast ref={toast} position="bottom-right" />
    <ConfirmDialog className="modal-contentProject  bgWhite rounded16 p-4 shadow   col-12 col-lg-6" acceptLabel="Удалить" acceptClassName="btn btn1 h56 mr-2" rejectLabel="Отмена" rejectClassName="btn btn1 h56 mr-2ml-auto btn btn1 h56 outline shadow-none flexCenter CancelProject" group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Вы уверены что хотите удалить проект?" 
                icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />

    <button id="DeletePr"  type="button" className="administrator_button__WAzsm"  title="удалить" onClick={() => setVisible(true)}>
      <img src="/static/media/ic-bin.b2f853337f6ee57b98d1fd97194cbe3c.svg" className="w24 reddishSvg mr-2 ml-2" alt=""></img>
      </button>
      
  
    </div>
    </OutsideClickHandler>

  );
};

export default ProjectListItem;
