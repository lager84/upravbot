import { gql } from "@apollo/client";


export const GET_DISP = gql`
 query SprDisp($client_ID:String!){
   sprDisp(where:  {
     userId: {eq:$client_ID       
     }
  }){
    id,
    dispStatus,
    phoneDisp,
    dispName,
    userId,
  }
 }
`;

export const READ_DISP_ITEM = gql`  
query SprDisp($id:ID ) {
  sprDisp(id:$id ) {
     id,
    dispStatus,
    phoneDisp,
    dispName,
    userId,
    
  }
}
`