import { FC,   useEffect,   useState } from "react";
import { TsprProject } from "../../utils/typesTS";
import accountStore from "../../services/accountsStore";
import { useQuery } from "@apollo/client";
import Loader from "../loader/Loader";
import { GET_PROJECT } from "../../apollo/QLProjects";
import { selectedProjectIdVar } from "../../apollo/client";



type TState = TsprProject;

type TProp = {
  cardId:number ;
};

const ProjectsSelect: FC<TProp> = ({cardId}) => {

 

    var userInfo = accountStore((state) => state);
    const client_ID = userInfo.userID;
    const [projects , setProjects] = useState<TState>({
      id: cardId,
      projectName: "",
      client_id:""
    });

     const { data, loading, error ,refetch } = useQuery(GET_PROJECT, {
        variables: { client_ID },
      });

      useEffect(() => {
      selectedProjectIdVar(cardId);
    }, [selectedProjectIdVar]);

      const onChange = (event: any) => {
        const { name, value } = event.target;
        setProjects((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      
        selectedProjectIdVar(Math.floor(parseFloat(value || "")));
      };
    
      if (loading)
        return (
          <>
            <Loader />
          </>
        );
    
      if (error) return <>`Submission error! ${error.message}`</>;
console.log(projects)
    return (
        <div className="posRel flex-grow-1 mr-3">
                <label className="transp backLab">Проект *</label>
                <select
                  name="id"
                  title="Проекты"
                  value={projects.id}
                  onChange={onChange}
                  className="pt-3 select2-hidden-accessible"
                >
                  {data && data.sprGilFindProjects.map((ditail:TState)=>(<option key={ditail.id} value={ditail.id}>{ditail.projectName}</option>))}
                  
                </select>
              </div>
            );
};

export default  ProjectsSelect