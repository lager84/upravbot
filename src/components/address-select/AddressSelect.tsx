import { FC,   useEffect,   useState } from "react";
import { sprStreet} from "../../utils/typesTS";
import accountStore from "../../services/accountsStore";
import { useQuery } from "@apollo/client";
import Loader from "../loader/Loader";
import { GET_STREETS } from "../../apollo/QLObjects";
import {selectedStreetVar } from "../../apollo/client";
import InputComponent from "../imput-component/InputComponent";
import { Column } from "primereact/column";



type TState = sprStreet;



const AddressSelect: FC<TState> = ({id , oblast , city , raion , sName}) => {

 

    var userInfo = accountStore((state) => state);
    const client_ID = userInfo.userID;
    const [street , setStreet] = useState<TState>({
      id: id,
      oblast:oblast,
      city:city,
      sName:sName,
      raion:raion
    });

    const [disabled , setDisabled] = useState(true);

     const { data, loading, error ,refetch } = useQuery(GET_STREETS, {
        variables: { client_ID },
      });

      useEffect(() => {
        selectedStreetVar(id);
    }, [selectedStreetVar]);

      const onChange = (event: any) => {
        const { name, value } = event.target;
        setStreet((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      
        selectedStreetVar(Math.floor(parseFloat(value || "")));
      };
    
      if (loading)
        return (
          <>
            <Loader />
          </>
        );
    
      if (error) return <>`Submission error! ${error.message}`</>;
console.log(street)
    return (
      
 
<div style={{flexDirection:"column" , width:"100%"}}>
<InputComponent
      type="text"
      onChange={onChange}
      value={street.oblast}
      children="Область *"
      name="Oblast"
      classCss={disabled ? "Oblast bgLightGrey" : "Oblast"  }
      id_name="Oblast"
      maxLength={200}
      disabled={disabled}
    />
 

     <InputComponent
      type="text"
      onChange={onChange}
      value={street.city}
      children="Город *"
      name="City"
      classCss={disabled ? "City bgLightGrey" : "City"  }
      id_name="City"
      maxLength={200}
      disabled={disabled}
      
    />
 
   
  
 <InputComponent
      type="text"
       onChange={onChange}
       value={street.raion}
       children="Район"
       name="Raion"
       classCss={disabled ? "Raion bgLightGrey" : "Raion"  }
       id_name="Raion"
       maxLength={200}
       disabled={disabled}
     />
   
        <div className="posRel flex-grow-1 mr-3">
                <label className="transp backLab">Улица *</label>
                <select
                  name="id"
                  title="Улица"
                  value={street.id}
                  onChange={onChange}
                  className="pt-3 select2-hidden-accessible"
                >
                  {data && data.sprStreets.map((ditail:TState)=>(<option key={ditail.id} value={ditail.id}>{ditail.sName}</option>))}
                  
                </select>

              </div>
              
              </div>

              
            );
};

export default  AddressSelect