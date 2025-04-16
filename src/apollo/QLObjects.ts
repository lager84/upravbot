import { gql } from "@apollo/client";




export const GET_OBJECTS = gql`
 query GilFindObjects($client_ID:String!){
  gilFindObjects(where:  {
     balanceCompany:  {
        client_ID:  {
           eq:$client_ID
        }
     }
  }){
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

export const GET_STREETS = gql`
 query   SprStreets($client_ID: String!){
  sprStreets(where:{client_ID:  {eq: $client_ID}}){
    id,
    oblast,
    city,
    raion,
    sName
  }
}
`;

export const CREATE_STREET = gql`
mutation AddStreet( $oblast:String,$raion:String, $city:String ,$sName:String!,$client_ID: String!){
  addStreet(oblast:$oblast, raion:$raion, city:$city, sName:$sName , client_ID:$client_ID)
  {
    oblast,
    city,
    raion,
    sName,
    id,
    client_ID
  }
}
`;

export const EDIT_STREET = gql`
mutation UpdateStreet( $id:Int! $oblast:String,$raion:String, $city:String ,$sName:String!,$client_ID: String!){
  updateStreet(sprStreets:{id:$id ,oblast:$oblast, raion:$raion, city:$city, sName:$sName , client_ID:$client_ID})
  {
    oblast,
    city,
    raion,
    sName,
    id,
    client_ID
  }
}
`;
export const DELETE_OBJECT = gql`
mutation DeleteGilFindObjects($id: Int!  ){
  deleteGilFindObjects(id: $id )
}
`