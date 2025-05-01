import { FC,   useEffect,   useState } from "react";
import { sprStreet} from "../../utils/typesTS";
import accountStore from "../../services/accountsStore";
import { useMutation, useQuery } from "@apollo/client";
import Loader from "../loader/Loader";
import { GET_STREETS , EDIT_STREET} from "../../apollo/QLObjects";
import {selectedStreetVar } from "../../apollo/client";
import InputComponent from "../imput-component/InputComponent";
import saveImg from "../../img/ic_terms.png"
import { Link, useLocation } from "react-router-dom";
import plus from "../../img/ic-plus.svg";



type TState = sprStreet ;




const AddressSelect: FC<TState> = ({id , oblast , city , raion , sName}) => {



    var userInfo = accountStore((state) => state);
    const client_ID = userInfo.userID;
    const location = useLocation();

    const [street , setStreet] = useState<TState>({
      id: id,
      oblast:oblast,
      city:city,
      sName:sName,
      raion:raion,
      client_ID:client_ID || "",

    });


    const [disabled , setDisabled] = useState(true);

     const { data, loading, error  } = useQuery(GET_STREETS, {
        variables: { client_ID },
      });

      const [
          updateStreet,
          {  loading: loading_upd_Street, error: error_upd_Street },
        ] = useMutation(EDIT_STREET, {
          onCompleted: () => {
           setDisabled(true);
           selectedStreetVar(id)
          },
        });

        const handleStreetSubmit = (event: any) => {
          event.preventDefault();
      
          const {
            id,
            oblast,
            city,
            sName,
            raion,
            client_ID
      
          } = street;
        
          // Execute the mutation
          updateStreet({
            variables: {
             id, 
             oblast,
            city,
            sName,
            raion,
            client_ID
              
            },
          });
        }
        

      useEffect(() => {
        selectedStreetVar(id);
    }, [id]);

      const onChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'id') {
          const selectedStreet = data.sprStreets.find((street: TState) => street.id === parseInt(value));
          if (selectedStreet) {
            setStreet((prevFormData) => ({
              ...prevFormData,
              id: selectedStreet.id,
              oblast: selectedStreet.oblast,
              city: selectedStreet.city,
              raion: selectedStreet.raion,
              sName: selectedStreet.sName,
            }));
          }
        } else {
          setStreet((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
        selectedStreetVar(Math.floor(parseFloat(value || "")));
      };
    
      
  if (loading) return <Loader />;
  if (error) return <div>${error.message}</div>;
  if (loading_upd_Street) return <Loader />;
  if (error_upd_Street) return <div>${error_upd_Street.message}</div>;

    return (
      
 
<div style={{flexDirection:"column" , width:"100%"}}>
<InputComponent
      type="text"
      onChange={onChange}
      value={street.oblast}
      children="Область *"
      name="oblast"
      classCss={disabled ? "Oblast bgLightGrey" : "Oblast"  }
      id_name="oblast"
      maxLength={200}
      disabled={disabled}
    />
 

     <InputComponent
      type="text"
      onChange={onChange}
      value={street.city}
      children="Город *"
      name="city"
      classCss={disabled ? "City bgLightGrey" : "City"  }
      id_name="city"
      maxLength={200}
      disabled={disabled}
      
    />
 
   
  
 <InputComponent
      type="text"
       onChange={onChange}
       value={street.raion}
       children="Район"
       name="raion"
       classCss={disabled ? "Raion bgLightGrey" : "Raion"  }
       id_name="raion"
       maxLength={200}
       disabled={disabled}
     />


      
 
   {disabled ?
   <div className="flexHoriz justify-content-between">
        <div className="posRel flex-grow-1 mr-3">
                <label className="transp backLab">Улица *</label>
                <select
                  name="id"
                  title="Улица"
                  value={street.id}
                  onChange={onChange}
                  className="pt-3 select2-hidden-accessible"
                >
                  {id===-1 &&  <option value={id}>{sName}</option>}
                  {data && data.sprStreets.map((ditail:TState)=>(<option key={ditail.id} value={ditail.id}>{ditail.sName}</option>))}
                  
                </select>
               
              </div>
              <div>
              <Link to="/objects/editObject/createStreet" title="Добавить улицу" style={{marginRight:"10px"}}  state={{ location: location }} className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"  >         
              <img src={plus} className="w16 reddishSvg" alt=""></img>
            </Link>
          <button  title="Редактировать улицу"  onClick={()=>setDisabled(false)}  type="button" className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"  >         
              <img src="/static/media/tasks-ic-bl.3e35cee28294ee173b3c7a76f6cf3529.svg" className="w16  reddishSvg" alt=""></img>
          </button>   
            
          </div>   
          
        </div>
              :
              <div style={{gap:"10px"}}  className="flexHoriz justify-content-between">

              <InputComponent
      type="text"
       onChange={onChange}
       value={street.sName}
       children="Улица"
       name="sName"
       classCss={"Raion"}
       id_name="sName"
       maxLength={200}
     
     />


     <button  title="Редактировать улицу"   type="button" onClick={handleStreetSubmit} className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"  >         
     <img src={saveImg} className="w16  reddishSvg" alt=""></img>
</button>

</div>

              }
              </div>

              
            );
};

export default  AddressSelect