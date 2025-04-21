import React, { FC} from 'react';

import { useParams } from 'react-router-dom';
import { READ_ACCOUNT_ITEM} from "../../apollo/QLAccount";
import { useQuery } from '@apollo/client';
import Loader from '../../components/loader/Loader';
import AddEditAccount from '../../components/add-edit-account/AddEditAccount';


const EditAccountPage: FC = () => {

    let { id } = useParams();


     const { data, loading, error } = useQuery(READ_ACCOUNT_ITEM, {
        variables: { id },
      });
    
  

     

      console.log(data)

  if (loading) return <Loader />;
  if (error) return <div>${error.message}</div>;
    return (
        <AddEditAccount card={true}  Email={data?.usersInfo[0].clientEmail}  FirstName={data?.usersInfo[0].firstName}  SecondName={data?.usersInfo[0].secondName}  userID={data?.usersInfo[0].userId}  phone_number={data?.usersInfo[0].clientPhoneNumber}  role={data?.usersInfo[0].role}  GivenName={data?.usersInfo[0].middleName} />
    )
}

export default EditAccountPage