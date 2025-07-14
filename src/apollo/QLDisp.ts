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
    dispObjects{
      gilFindObjectsId
    },
    dispUsers{
      userId ,
      roleId
    }
    
  }
}
`

export const READ_DISP_OBJECTS = gql`  
query DispObjects{
  dispObjects{
    gilFindObjectsId 
  }
}
`

export const CREATE_DISP = gql`
mutation AddDisp($dispName:String ,$dispStatus:Boolean! , $phoneDisp:String , $dispObjects:[DispObjectsDtoInput] , $dispetcher:[DispUsersDtoInput] , $otvetstvenniy:[DispUsersDtoInput], $ispolnitel:[DispUsersDtoInput]){
  addDisp(dispName: $dispName, 
  dispStatus: $dispStatus,
  phoneDisp: $phoneDisp,
  dispObjects:$dispObjects,
  dispetcher: $dispetcher,
  otvetstvenniy: $otvetstvenniy,
  ispolnitel: $ispolnitel
  )
  {
    id
    dispStatus
    phoneDisp
    dispName
    userId
  }
}
`

export const UPDATE_DISP = gql`
mutation UpdateDisp($id:Int! , $dispStatus:Boolean! , $dispName:String , $phoneDisp:String , $userId:String ,$dispObjects:[DispObjectsDtoInput] , $dispetcher:[DispUsersDtoInput] , $otvetstvenniy:[DispUsersDtoInput] , $ispolnitel:[DispUsersDtoInput] ){
  updateDisp(sprDisp: {id:$id, dispStatus:$dispStatus , dispName:$dispName , phoneDisp:$phoneDisp, userId:$userId } ,dispObjects: $dispObjects, dispetcher: $dispetcher, otvetstvenniy: $otvetstvenniy, ispolnitel: $ispolnitel)
  {
    id
    dispStatus
    phoneDisp
    dispName
    userId
  }
}
`
export const DELETE_DISP = gql`
mutation DeleteDisp($id:Int!){
  deleteDisp(id:$id)
}
`
