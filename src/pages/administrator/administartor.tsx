
import {UPDATE_ACCOUNT} from '../../apollo/updateAccount';
import InputComponent from '../../components/imput-component/InputComponent';
import  styles  from '../administrator/administrator.module.css';
import { useCallback, useEffect } from 'react';
import { useFormCallback } from '../../utils/use-form-callback';
import { useMutation } from '@apollo/client';
import {TState} from '../../utils/typesTS'
import accountStore from '../../services/accountsStore'

const AdministratorPage = () =>{


   
   

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
      <form className={styles.shadow} 
      onSubmit={onSubmit}
      >
        <h2 className={styles.divH}>Настройки профиля</h2>
        <div className={styles.divInput}>
        <InputComponent type='text' onChange={onChange} value={state.SecondName || ""} children='Фамилия' name='SecondName'  id_name='SecondName'/>
        </div>
        <div className={styles.divInput}>
        <InputComponent type='text' onChange={onChange} value={state.FirstName || ""} children='Имя' name='FirstName' id_name='FirstName'/>
        </div>
        <div className={styles.divInput}>
        <InputComponent type='text' onChange={onChange} value={state.GivenName || ""} children='Отчество' name='GivenName' id_name='GivenName'/>
        </div>
        <div className={styles.divInput}>
        <InputComponent type='email' onChange={onChange} value={state.Email || ""} children='E-mail' name='Email' id_name='Email'/>
        </div>
        <div className={styles.divInput}>
        <InputComponent  type='password' onChange={onChange} value={state.password || ""} children='Пароль' name='password' id_name='password'/>
        </div>
        <div className={styles.divInput}>
        <InputComponent type='tel' onChange={onChange} value={state.phone_number || ""} children='Мобильный телефон' name='phone_number' id_name='phone_number'/>
        </div>
        <div className={styles.divBut}>
        <button className={styles.btn} type="submit">
          <strong>Сохранить изменения</strong>
          </button>
        </div>
        </form>
       )
}


export default AdministratorPage;
