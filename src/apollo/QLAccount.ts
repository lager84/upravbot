import { gql } from "@apollo/client";




export const GET_ACCOUNTS = gql`
 query UsersInfo{
  usersInfo
  {
    userId
    userName
    secondName
    firstName
    middleName
    clientID
    role
    clientEmail
    clientPhoneNumber
    
  }
}
`;

export const READ_ACCOUNT_ITEM = gql`  
query UsersInfo($id:ID ) {
  usersInfo(id:$id ) {
  userId
  userName
  secondName
  firstName
  middleName
  clientID
  role
  clientEmail
  clientPhoneNumber
    
  }
}
`

export const UPDATE_ACCOUNT = gql`mutation UpdateAccount ($email:String! , $firstName:String!, $middleName:String! , $secondName:String! , $password:String! , $phoneNumber:String! , $userID:String! , $role:[String]! ){
  updateAccount(email: $email, firstName: $firstName , middleName: $middleName, password: $password, phoneNumber: $phoneNumber,secondName: $secondName , userID: $userID , roles:$role){
   succeeded,
   errors{code , description} 
  }
}`

export const ADD_ACCOUNT = gql`mutation AddUser($clientID:String! , $email:String! , $firstName:String!, $middleName:String! , $secondName:String! , $password:String! , $phoneNumber:String!, $userName:String! , $role:[String]! ){
  addUser(clientID:$clientID , email: $email, firstName: $firstName , middleName: $middleName, password: $password, phoneNumber: $phoneNumber,secondName: $secondName , userName: $userName , roles:$role){
    succeeded,
    errors{code , description}  
    }
}`





export const DELETE_ACCOUNT = gql`
mutation DeleteAccount($userID: String!  ){
  deleteAccount(userID: $userID )
  {
    succeeded,
    errors{code, description}  
  }
}
`