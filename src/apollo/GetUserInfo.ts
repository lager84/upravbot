import { gql } from '@apollo/client';

export const GET_ME_USERS = gql` 
query{
meUserInfo{
    grants{
      userId
      userName
      role
      clientEmail
      clientPhoneNumber
      secondName
      firstName
      middleName
      claimUser{
        typeClaim
        valueClaim
      }
    }
  }
  }
`;