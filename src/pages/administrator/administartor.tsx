
import {UPDATE_ACCOUNT} from '../../apollo/updateAccount';
import InputComponent from '../../components/imput-component/InputComponent';
import  styles  from '../administrator/administrator.module.css';
import { FC, useCallback, useEffect } from 'react';
import { useFormCallback } from '../../utils/use-form-callback';
import { useMutation } from '@apollo/client';
import {TState} from '../../utils/typesTS'
import accountStore from '../../services/accountsStore'

const AdministratorPage:FC = () =>{


   
   

   const [updateAccount, { data, loading, error }] = useMutation(UPDATE_ACCOUNT);



var userInfo = accountStore((state) => state)



  

   useEffect(() => {

    setState({ SecondName:userInfo.SecondName , 
      FirstName: userInfo.FirstName, 
      GivenName: userInfo.GivenName , 
      Email: userInfo.Email ,
      password: userInfo.password ,
      phone_number: userInfo.phone_number});



   },[])


    const submitCallback = useCallback(
        (state:TState) => {
          updateAccount({ variables: { email: state.Email, firstName: state.FirstName , 
            middleName: state.GivenName, password: state.password, phoneNumber: state.phone_number, 
            secondName: state.SecondName , userID: userInfo.userID} });
            
            accountStore.setState(() => ({
              SecondName: state.SecondName, 
              FirstName: state.FirstName, 
              GivenName: state.GivenName , 
              Email: state.Email,
              password: state.password,
              phone_number: state.phone_number}));
            },
        []
        
      );

     

    const { state, setState, onChange, onSubmit } = useFormCallback(
        {
        SecondName: '',
        FirstName:'',
        GivenName:'',
        Email:'',
        password:'',
        phone_number:''
    },
    submitCallback

    

  );

 

    


    return (
      
       
          <div className="col-sm-12 p-0">
            <div className="row p-4 m-0">
              <div className="col-lg-6 col-sm-12">
               
            
            <form className="bgWhite rounded16 shadow w-100 p-4"
      onSubmit={onSubmit}
      >
        <div className="flexHoriz w-100">
         <h2 className="font24b textBlack mb-3"> Настройки профиля</h2>
          </div>

      
        <InputComponent type='text' onChange={onChange} value={state.SecondName || ""} children='Фамилия' name='SecondName' classCss='SecondName'  id_name='SecondName'/>
        
   
        <InputComponent type='text' onChange={onChange} value={state.FirstName || ""} children='Имя' name='FirstName' classCss='FirstName' id_name='FirstName'/>
    
    
        <InputComponent type='text' onChange={onChange} value={state.GivenName || ""} children='Отчество' name='GivenName' classCss='MiddleName' id_name='GivenName'/>
   
        
        <InputComponent type='email' onChange={onChange} value={state.Email || ""} children='E-mail' name='Email' classCss='email' id_name='Email'/>
       
    
        <InputComponent  type='password' onChange={onChange} value={state.password || ""} children='Пароль' name='password' classCss='pass' id_name='password'/>
       
   
        <InputComponent type='tel' onChange={onChange} value={state.phone_number || ""} children='Мобильный телефон' name='phone_number' classCss='email' id_name='phone_number'/>
    
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


export default AdministratorPage;
