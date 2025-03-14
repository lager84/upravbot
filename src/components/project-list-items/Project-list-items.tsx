import { FC, useState } from "react";
import { TsprProject } from "../../utils/typesTS";
import styles from "./Projectlistitems.module.css";
import { useNavigate } from "react-router-dom";
import { URL_EDIT_ORG } from "../../utils/routes";
import InputComponent from "../imput-component/InputComponent";

type TProp = {
  card: TsprProject;
};
const ProjectListItem: FC<TProp> = ({ card }) => {


  const navigate = useNavigate();

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


  return (
    // <div className={styles.divCard} onClick={() => navigate(`${URL_EDIT_ORG}/${card.cBid}`)}>
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
              disabled={true}
            />
              
    <button className="administrator_button__WAzsm" type="button" title="редактировать">
    <img src="/static/media/tasks-ic-bl.3e35cee28294ee173b3c7a76f6cf3529.svg" className="w24 reddishSvg mr-2 ml-2" alt=""></img>
    </button>
 
    <button id="DeletePr"  type="button" className="administrator_button__WAzsm"  title="удалить">
      <img src="/static/media/ic-bin.b2f853337f6ee57b98d1fd97194cbe3c.svg" className="w24 reddishSvg mr-2 ml-2" alt=""></img>
      </button>
      
  
    </div>

  );
};

export default ProjectListItem;
