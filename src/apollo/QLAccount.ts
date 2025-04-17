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

export const READ_OBJECT_ITEM = gql`  
query GilFindObjects($id:ID ) {
  gilFindObjects(id:$id ) {
    id,
    houseNumber,
    sprStreetId,
    sprStreet{
      oblast,
      city,
      sName,
      raion
    }
    gilFindProjectId,
    gilFindProject{
      projectName
    },
    balanceCompanyId,
    balanceCompany{
      name,
      client_ID
    },
    imageHouse
    
  }
}
`

export const UPDATE_OBJECT = gql`
mutation UpdateGilFindObject($id: Int!, $balanceCompanyId: Int!, $gilFindProjectId: Int!, $sprStreetId: Int!, $houseNumber: String!, $imageHouse: String){
  updateGilFindObject(
    gilFindObjects: {id: $id, balanceCompanyId: $balanceCompanyId, gilFindProjectId: $gilFindProjectId, sprStreetId: $sprStreetId, houseNumber: $houseNumber, imageHouse: $imageHouse}
    )
    {
  id,
  houseNumber,
  sprStreetId,
  gilFindProjectId,
  balanceCompanyId,
  imageHouse
  }
}
`;

export const CREATE_OBJECT = gql`
mutation AddGilFindObject( $balanceCompanyId: Int!, $gilFindProjectId: Int!, $sprStreetId: Int!, $houseNumber: String!, $imageHouse: String){
  addGilFindObject(
    balanceCompanyId: $balanceCompanyId, gilFindProjectId: $gilFindProjectId, sprStreetId: $sprStreetId, houseNumber: $houseNumber, imageHouse: $imageHouse
    )
    {
  id,
  houseNumber,
  sprStreetId,
  gilFindProjectId,
  balanceCompanyId,
  imageHouse
  }
}
`;


export const DELETE_OBJECT = gql`
mutation DeleteGilFindObjects($id: Int!  ){
  deleteGilFindObjects(id: $id )
}
`