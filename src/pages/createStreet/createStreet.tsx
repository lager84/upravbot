import InputComponent from "../../components/imput-component/InputComponent";
import { FC,  useState } from "react";
import { useMutation } from "@apollo/client";
import { sprStreet } from "../../utils/typesTS";
import Loader from "../../components/loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import accountStore from "../../services/accountsStore";
import { CREATE_STREET, GET_STREETS } from "../../apollo/QLObjects";


type TState = sprStreet;

const CreateStreet: FC = () => {
  const navigate = useNavigate();



  var userInfo = accountStore((state) => state);

  const [infoStreet, setInfoStreet] = useState<TState>({
    id: 1,
    oblast: "",
    city: "",
    raion: "",
    sName: "",
    client_ID : ""
  });

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setInfoStreet((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const {  oblast, city, raion, sName } = infoStreet;

    // Execute the mutation
    createStreet({
      variables: {
        oblast, 
        city, 
        raion, 
        sName,
        client_ID: userInfo.userID,
      },
      awaitRefetchQueries: true,
      refetchQueries: [GET_STREETS, "SprStreets"],
    });
  };

  const [createStreet, { data, loading, error }] = useMutation(
    CREATE_STREET,
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
              <h2 className="font24b textBlack">Создание Улицы</h2>
            </div>

            <div style={{flexDirection:"column" , width:"100%"}}>
<InputComponent
      type="text"
      onChange={onChange}
      value={infoStreet.oblast}
      children="Область *"
      name="oblast"
      classCss="Oblast"
      id_name="oblast"
      maxLength={200}
      required={true}
    />
 

     <InputComponent
      type="text"
      onChange={onChange}
      value={infoStreet.city}
      children="Город *"
      name="city"
      classCss= "City"  
      id_name="city"
      maxLength={200}
      required={true}
      
    />

<InputComponent
      type="text"
       onChange={onChange}
       value={infoStreet.raion}
       children="Район"
       name="raion"
       classCss="Raion"  
       id_name="raion"
       maxLength={200}
   
     />

    <InputComponent
      type="text"
      onChange={onChange}
      value={infoStreet.sName}
      children="Улица *"
      name="sName"
      classCss= "Street"  
      id_name="sName"
      maxLength={200}
      required={true}
      
    />
 
   
  
 
     </div>

            <div className="row mt-3 mb-3">
              <div className="col-sm-12">
                <button className="btn btn1 h56 mr-2" type="submit">
                  <strong>Сохранить</strong>
                </button>
                <button
                  onClick={() => navigate(-1) }
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

export default CreateStreet;
