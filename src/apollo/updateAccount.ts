import { gql, useMutation } from '@apollo/client';


export const UPDATE_ACCOUNT = gql`mutation UpdateAccount ($email:String! , $firstName:String!, $middleName:String! , $secondName:String! , $password:String! , $phoneNumber:String! , $userID:String! ){
  updateAccount(email: $email, firstName: $firstName , middleName: $middleName, password: $password, phoneNumber: $phoneNumber,secondName: $secondName , userID: $userID){
    firstName,
    id
  }
}`