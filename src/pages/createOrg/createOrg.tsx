import InputComponent from "../../components/imput-component/InputComponent";
import { FC, useCallback, useEffect, useState } from "react";
import { useFormCallback } from "../../utils/use-form-callback";
import { ApolloClient, gql, InMemoryCache, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { TUOorg } from "../../utils/typesTS";
import Loader from "../../components/loader/Loader";
import { GET_UO_ORG } from "../../apollo/GetUOorg";
import { useParams } from "react-router-dom";
import accountStore from "../../services/accountsStore";









type TState = TUOorg
 


const CreateOrg:FC = () => {

  let { id } = useParams();
  //const [skipState , setSkipState] = useState(false)
  
  // var userInfo = accountStore((state) => state);
  // const client_ID = userInfo.userID;
  

const READ_TODO = gql`  
query BalanceCompany($id:ID ) {
  balanceCompany(id:$id ) {
    id 
    name
    phone
    inn
    sprTypeBalanceCompany {
      compType
    }
    adress
    kpp
    ogrn_OgrnIP
    okpo
    
  }
}
`

const { data, loading, error } = useQuery(READ_TODO, {
  variables: { id }
});






// const client = useApolloClient()
// // получаем кешированную задачу с `id === 5`
// const  todo  = client.readQuery({ 
//   query: READ_TODO,
//   variables: { // передаем переменную
//     id: id
//   },
// })


 console.log(data)




return(
    <div className="col-sm-12 p-0">
    <div className="row p-4 m-0">
      <div className="col-lg-6 col-sm-12">
        <form
          className="bgWhite rounded16 shadow w-100 p-4"
         // onSubmit={onSubmit}
        >
          <div className="flexHoriz w-100">
            <h2 className="font24b textBlack mb-3"> Настройки профиля</h2>
          </div>

          {/* <InputComponent
            type="text"
            onChange={onChange}
            value={state.SecondName || ""}
            children="ИНН"
            name="inn"
            classCss="inn"
            id_name="INN"
          />

          <InputComponent
            type="text"
            onChange={onChange}
            value={state.FirstName || ""}
            children="ОГРН"
            name="OGRN"
            classCss="OGRN"
            id_name="OGRN"
          />

          <InputComponent
            type="text"
            onChange={onChange}
            value={state.GivenName || ""}
            children="Наименование организации"
            name="NAME"
            classCss="NAME"
            id_name="NAME"
          />

           
              <InputComponent
                type="text"
                onChange={onChange}
                value={state.Email || ""}
                children="КПП"
                name="KPP"
                classCss={"KPP"}
                id_name="KPP"
              
                />
          
       
          
              <InputComponent
                type={"text"}
                onChange={onChange}
                value={state.password || ""}
                children="ОКПО"
                name="OKPO"
                classCss={"OKPO"}
                id_name="OKPO"
              />
      

          <InputComponent
            type="tel"
            onChange={onChange}
            value={state.phone_number || ""}
            children="Область, город, район, улица"
            name="adr"
            classCss="adr"
            id_name="adr"
          /> */}

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

)
    

}

export default CreateOrg;