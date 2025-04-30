import InputComponent from "../../components/imput-component/InputComponent";
import { FC, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { TsprObject } from "../../utils/typesTS";
import Loader from "../../components/loader/Loader";
import { ADD_MANAGER_OBJECT, CREATE_OBJECT } from "../../apollo/QLObjects";
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
import { selectedManagerVar, selectedProjectIdVar } from "../../apollo/client";
import { selectedOUVar } from "../../apollo/client";
import { selectedStreetVar } from "../../apollo/client";
import UOSelect from "../../components/UO-select/UOSelect";
import AddressSelect from "../../components/address-select/AddressSelect";
import plus from "../../img/ic-plus.svg";
import AddManagerObject from "../../components/add-manager-object/AddManagerObject";







type TState = TsprObject;


const CreateObject: FC = () => {
  const navigate = useNavigate();

  const selectedProjectId = useReactiveVar(selectedProjectIdVar);
  const selectedOUVarId = useReactiveVar(selectedOUVar);
  const selectedStreetVarId = useReactiveVar(selectedStreetVar);
  const selectedManagerVarId = useReactiveVar(selectedManagerVar);
  

    const [visible, setVisible] = useState<boolean>(false);

  //   const accept =  () => { 
  //     onDelete(); 
     
  // }
  

  
  var userInfo = accountStore((state) => state);
  const client_ID = userInfo.userID;
  // let { id } = useParams();

  
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
   id:-1,
   city:"",
   balanceCompanyId:-1,
   client_ID:userInfo.userID || "",
   gilFindProjectId:-1,
   houseNumber:"",
   name:"",
   oblast:"",
   projectName:"",
   sName:"",
   sprStreetId:-1,
   raion:""
  
  });

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setInfoObject((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

const [showWarning, setShowWarning] = useState(false);

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

    if (selectedOUVarId === -1 || selectedProjectId === -1 || selectedStreetVarId === -1 || selectedManagerVarId?.length === 0 || selectedManagerVarId === null ) {
      setShowWarning(true); 
      return;
    }
  
    // Execute the mutation
    createObject({
      variables: { 
       balanceCompanyId:selectedOUVarId, 
       gilFindProjectId:selectedProjectId, 
       sprStreetId:selectedStreetVarId,
       houseNumber:infoObject.houseNumber,
       //imageHouse:""
        
      },
    });
  }
  

  // const { data, loading, error } = useQuery(READ_OBJECT_ITEM, {
  //   variables: { id },
  // });

  const [
    createObject,
    { loading: loading_upd_Object, error: error_upd_Object },
  ] = useMutation(CREATE_OBJECT, {
    onCompleted: (data) => {
      const objectId = data.addGilFindObject.id;
      createManagerObject({variables:{
        objectId:objectId,
        userId:selectedManagerVarId?.map((usersItem:any)=>usersItem?.userId)
    }})
}});

  const [
    createManagerObject,
    { loading: loading_manager_Object, error: error_manager_Object },
  ] = useMutation(ADD_MANAGER_OBJECT, {
    onCompleted: () => {
      navigate("/objects");
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     setInfoObject({
  //       id:data.id,
  //       city:data.gilFindObjects.sprStreet.city,
  //       balanceCompanyId:data.gilFindObjects.balanceCompanyId,
  //       client_ID:userInfo.userID || "",
  //       gilFindProjectId:data.gilFindObjects.gilFindProjectId,
  //       houseNumber:data.gilFindObjects.houseNumber,
  //       oblast:data.gilFindObjects.sprStreet.oblast,
  //       sName:data.gilFindObjects.sprStreet.sName,
  //       projectName:data.gilFindObjects.gilFindProject.projectName,
  //       sprStreetId:data.gilFindObjects.sprStreetId,
  //       name:data.gilFindObjects.balanceCompany.name,
  //       raion:data.gilFindObjects.sprStreet.raion,

        
  //     });
      
  //  }
   
  // }, [data]);



  


  if (loading_upd_Object) return <Loader />;
  if (error_upd_Object) return <div>${error_upd_Object.message}</div>;
  if (loading_manager_Object) return <Loader />;
  if (error_manager_Object) return <div>${error_manager_Object.message}</div>;


  return (
    <div className="col-sm-12 p-0">
      <div className="row p-4 m-0">
        <div className="col-lg-9 col-sm-12">
          <form
            className="bgWhite rounded16 shadow w-100 p-4"
            onSubmit={handleSubmit}
          >
            <div className="flexHoriz w-100">
              <h2 className="font24b textBlack">Добавить объект</h2>


             
            </div>
            <div className="flexHoriz justify-content-between mt-3">
              <UOSelect cardId={infoObject.balanceCompanyId}/>               
              <Link to="/registerUO/createOrg" title="Добавить УК" className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"  >         
                       <img src={plus} className="w16 reddishSvg" alt=""></img>
                     </Link>

            </div>
            <div className="flexHoriz justify-content-between mt-3">
             <ProjectsSelect  cardId={infoObject.gilFindProjectId} />
             <Link to="/projects/createProject" title="Добавить проект" className="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto"  >         
                       <img src={plus} className="w16 reddishSvg" alt=""></img>
                     </Link>
            </div>
            <div className="flexHoriz justify-content-between mt-3">
            <AddressSelect  id={infoObject.id} city={infoObject.city} oblast={infoObject.oblast} raion={infoObject.raion} sName={"Выберете улицу *"} client_ID="" />
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

 <AddManagerObject/>

{showWarning && <div style={{color:"red"}}>Пожалуйста, выберите все обязательные поля!</div>}

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

export default CreateObject;
