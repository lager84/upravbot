import InputComponent from "../../components/imput-component/InputComponent";
import { FC, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { TsprObject } from "../../utils/typesTS";
import Loader from "../../components/loader/Loader";
import { UPDATE_OBJECT } from "../../apollo/QLObjects";
import { READ_OBJECT_ITEM} from "../../apollo/QLObjects";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import imgBin from "../../img/ic-bin.svg";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import 'primereact/resources/themes/lara-light-blue/theme.css'
import accountStore from "../../services/accountsStore";
import ProjectsSelect from "../../components/projects-select/ProjectsSelect";
import { useReactiveVar } from '@apollo/client';
import { selectedProjectIdVar } from "../../apollo/client";
import { selectedOUVar } from "../../apollo/client";
import { selectedStreetVar } from "../../apollo/client";
import UOSelect from "../../components/UO-select/UOSelect";
import AddressSelect from "../../components/address-select/AddressSelect";
import plus from "../../img/ic-plus.svg";




type TState = TsprObject;


const EditObject: FC = () => {
  const navigate = useNavigate();

  const selectedProjectId = useReactiveVar(selectedProjectIdVar);
  const selectedOUVarId = useReactiveVar(selectedOUVar);
  const selectedStreetVarId = useReactiveVar(selectedStreetVar);
  const location = useLocation();

    const [visible, setVisible] = useState<boolean>(false);

  //   const accept =  () => { 
  //     onDelete(); 
     
  // }
  
  
  var userInfo = accountStore((state) => state);
  const client_ID = userInfo.userID;
  let { id } = useParams();

  
  // const [deleteUO, { loading: loadingDUO, error: errorDUO, data: dataDUO }] =
  // useMutation(DELETE_UO , {onCompleted: () => {
  //   navigate("/registerUO");
  // },});

  // const onDelete = () =>{
  //   deleteUO({variables:{
  //     idCB:Math.floor(parseFloat(id || "")),
  //    // idC:Math.floor(parseFloat(infoUO.balanceCompanyId || ""))
  //   }})
  // }

  




  const [infoObject, setInfoObject] = useState<TState>({
   id:1,
   city:"",
   balanceCompanyId:1,
   client_ID:userInfo.userID || "",
   gilFindProjectId:1,
   houseNumber:"",
   name:"",
   oblast:"",
   projectName:"",
   sName:"",
   sprStreetId:1,
   raion:""
  
  });

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setInfoObject((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const {
     balanceCompanyId,
     client_ID,
     city,
     gilFindProjectId,
     houseNumber,
     name,
     //id,
     sprStreetId,
     oblast,
     projectName,
     sName,
     raion

    } = infoObject;
  
    // Execute the mutation
    updateObject({
      variables: {
       id:Math.floor(parseFloat(id || "")) , 
       balanceCompanyId:selectedOUVarId, 
       gilFindProjectId:selectedProjectId, 
       sprStreetId:selectedStreetVarId,
       houseNumber:infoObject.houseNumber,
       //imageHouse:""
        
      },
    });
  }
  

  const { data, loading, error } = useQuery(READ_OBJECT_ITEM, {
    variables: { id },
  });

  const [
    updateObject,
    { data: data_upd_Object, loading: loading_upd_Object, error: error_upd_Object },
  ] = useMutation(UPDATE_OBJECT, {
    onCompleted: () => {
      navigate("/objects");
    },
  });

  useEffect(() => {
    if (data) {
      setInfoObject({
        id:data.id,
        city:data.gilFindObjects.sprStreet.city,
        balanceCompanyId:data.gilFindObjects.balanceCompanyId,
        client_ID:userInfo.userID || "",
        gilFindProjectId:data.gilFindObjects.gilFindProjectId,
        houseNumber:data.gilFindObjects.houseNumber,
        oblast:data.gilFindObjects.sprStreet.oblast,
        sName:data.gilFindObjects.sprStreet.sName,
        projectName:data.gilFindObjects.gilFindProject.projectName,
        sprStreetId:data.gilFindObjects.sprStreetId,
        name:data.gilFindObjects.balanceCompany.name,
        raion:data.gilFindObjects.sprStreet.raion,

        
      });
      
   }
   
  }, [data]);

  console.log(data);
  console.log(infoObject);

  

  if (loading) return <Loader />;
  if (error) return <div>${error.message}</div>;
  if (loading_upd_Object) return <Loader />;
  if (error_upd_Object) return <div>${error_upd_Object.message}</div>;
 

  return (
    <div className="col-sm-12 p-0">
      <div className="row p-4 m-0">
        <div className="col-lg-6 col-sm-12">
          <form
            className="bgWhite rounded16 shadow w-100 p-4"
            onSubmit={handleSubmit}
          >
            <div className="flexHoriz w-100">
              <h2 className="font24b textBlack">Добавить объект</h2>


              <button id="DeleteUO" type="button" onClick={() => setVisible(true)} className="transp border-0 ml-auto">
                <img
                  src={imgBin}
                  className="mr-3 position-absolute d-flex ml-n4 "
                  alt=""
                ></img>
                <span id="delspan" className="font16b reddish">
                  Удалить объект
                </span>
              </button>
            </div>
            <div className="flexHoriz justify-content-between mt-3">
              <UOSelect cardId={data?.gilFindObjects?.balanceCompanyId}/>
              <Link to="/registerUO/createOrg" title="Добавить УК" className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"  >         
                       <img src={plus} className="w16 reddishSvg" alt=""></img>
                     </Link>

            </div>
            <div className="flexHoriz justify-content-between mt-3">
             <ProjectsSelect  cardId={data?.gilFindObjects?.gilFindProjectId} />
             <Link to="/projects/createProject" title="Добавить проект" className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"  >         
                       <img src={plus} className="w16 reddishSvg" alt=""></img>
                     </Link>
            </div>
            <div className="flexHoriz justify-content-between mt-3">
            <AddressSelect id={data?.gilFindObjects?.sprStreetId} city={data.gilFindObjects.sprStreet.city} oblast={data.gilFindObjects.sprStreet.oblast} raion={data.gilFindObjects.sprStreet.raion} sName={data.gilFindObjects.sprStreet.sName} client_ID="" />
            <Link to="/objects/editObject/createStreet" title="Добавить улицу" style={{marginTop:"212px"}} state={{ location: location }} className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"  >         
                       <img src={plus} className="w16 reddishSvg" alt=""></img>
                     </Link>
            </div>

              
                         <InputComponent
                          type="text"
                          onChange={onChange}
                          value={infoObject.houseNumber}
                          children="Номер дома *"
                          name="houseNumber"
                          classCss="houseNumber"
                          id_name="houseNumber"
                          required={true}
                          maxLength={20}
                        /> 

          

            <div className="row mt-3 mb-3">
              <div className="col-sm-12">
                <button className="btn btn1 h56 mr-2" type="submit">
                  <strong>Сохранить изменения</strong>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditObject;
