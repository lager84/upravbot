import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import { useQuery} from '@apollo/client';
import { GET_ACCOUNTS } from '../../apollo/QLAccount';
import Loader from '../loader/Loader';
import styles from "./AddManagerObject.module.css";
import { selectedManagerVar } from "../../apollo/client";
import { useParams } from 'react-router-dom';
import { GET_MANAGER_OBJECT } from '../../apollo/QLObjects';




const AddManagerObject = () => {

    let { id } = useParams();
    const [account, setAccount] = useState([]);
    
    

    
const { data, loading, error } = useQuery(GET_ACCOUNTS);


const { data:data_manager, loading:loading_manager, error: error_manager} = useQuery(GET_MANAGER_OBJECT, {
    variables:  {gilFindObjectsId:Math.floor(parseFloat(id || "")) },
    skip: !id 
  });

  
   const [target, setTarget] = useState([]);
   

      
  useEffect(() => {
  if(data_manager){
    const userItems = data_manager?.gilFindManager?.map((comp:any) => comp.userId);
    const filterAccount = data?.usersInfo.filter((comp:any) => !userItems.includes( comp.userId))
    const filterTarget = data?.usersInfo.filter((comp:any) => userItems.includes( comp.userId))
    setAccount(filterAccount); 
    setTarget(filterTarget);  
    selectedManagerVar(filterTarget) 
  }
  else
  {
    
    setAccount(data?.usersInfo.map((comp: any) => comp)); 
    selectedManagerVar([])
  }
  }, [data, loading , data_manager]);





    
    const onChange = (event: { source: React.SetStateAction<never[]>; target: React.SetStateAction<never[]>; }) => {
            setAccount(event.source);
            setTarget(event.target);
            selectedManagerVar(event.target as string[]);
          
        };  

        const itemTemplate = (item:any) => {
            return (
                <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2">
                        <span className="font-bold">{item.secondName + ' ' + item.firstName + ' ' + item.middleName}</span>
                    </div>
                </div>
            );
        };


 if (loading) return <Loader />;
 if (error) return <div>${error.message}</div>;
 if (loading_manager) return <Loader />;
 if (error_manager) return <div>${error_manager.message}</div>;


return (
    <div className="card">
    <PickList dataKey="userId" className={styles.mycontrol} source={account} target={target} onChange={onChange} itemTemplate={itemTemplate} filter filterBy="secondName" breakpoint="1280px"
        sourceHeader="Менеджеры" targetHeader="Выбранные *" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }}
        sourceFilterPlaceholder="Введите фамилию" targetFilterPlaceholder="Введите фамилию"  showSourceControls={false} showTargetControls={false}/>
</div>
    )
}

export default AddManagerObject;