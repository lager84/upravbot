import { gql } from '@apollo/client';

export const GET_UO_ORG = gql` 
query BalanceCompany($client_ID: String!) {
  balanceCompany(where: { client_ID: { eq: $client_ID } }) {
    id
    name
    phone
    email
    client_ID
    inn
    sprTypeBalanceCompany {
      compType
      __typename
    }
    adress
    kpp
    licence
    ogrn_OgrnIP
    okpo
    __typename
  }
}
`;