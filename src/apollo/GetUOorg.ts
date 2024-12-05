import { gql } from '@apollo/client';

export const GET_UO_ORG = gql` 
query BalanceCompany($client_ID: String! ) {
  balanceCompany(where: { client_ID: { eq: $client_ID } }) {
    id 
    name
    phone
    inn
    sprTypeBalanceCompany {
      compType
    }
    adress
    kpp
    ogrn_OgrnIP
    okpo
    
  }
}
`;