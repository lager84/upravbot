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
      sName
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

export const CREATE_PROJECT = gql`
 mutation AddProject( $projectName:String!,$client_ID: String!){
   addProject (projectName:$projectName , client_ID:$client_ID ){
    id,
    projectName,
    client_ID
  }
}
`;

export const UPDATE_PROJECT = gql`
mutation UpdateProject($id: Int!, $projectName:String! , $client_id:String!){
  updateProject(sprGilFindProjects: {id:$id , projectName:$projectName , client_ID:$client_id} ){
    id,
    projectName,
    client_ID
  }
}
`;

export const DELETE_PROJECT = gql`
mutation DeleteProject($id: Int!  ){
  deleteProject(id: $id )
}

`;
