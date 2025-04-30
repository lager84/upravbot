import React, { FC } from "react";
import AddEditAccount from "../../components/add-edit-account/AddEditAccount";





const CreateAccountPage: FC = () => {
  
   

  return (   
    <AddEditAccount card={false}  Email={""}  FirstName={""}  SecondName={""}  userID={""}  phone_number={""}  role={[]}  GivenName={""}/>
  );
};

export default CreateAccountPage;
