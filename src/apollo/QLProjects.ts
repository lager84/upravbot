import { gql } from "@apollo/client";




export const GET_PROJECT = gql`
 query SprGilFindProjects($client_ID: String!){
  sprGilFindProjects (where:  {
     client_ID:  {
        eq: $client_ID
     }
  }){
    id,
    projectName,
    client_ID
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

