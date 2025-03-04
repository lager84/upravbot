import { FC } from "react";
import { TsprProject } from "../../utils/typesTS";
import styles from "./Projectlistitems.module.css";
import { useNavigate } from "react-router-dom";
import { URL_EDIT_ORG } from "../../utils/routes";

type TProp = {
  card: TsprProject;
};
const ProjectListItem: FC<TProp> = ({ card }) => {


  const navigate = useNavigate();


  return (
    // <div className={styles.divCard} onClick={() => navigate(`${URL_EDIT_ORG}/${card.cBid}`)}>
    <div className={styles.divCard} >
      <h3 className="h3">{card.projectName}</h3>

    </div>
  );
};

export default ProjectListItem;
