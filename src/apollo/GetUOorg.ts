import { gql } from "@apollo/client";




export const GET_UO_ORG = gql`
  query CompanyBills($client_ID: String!) {
    companyBills(where: { balanceCompany: { client_ID: { eq: $client_ID } } }) {
      id
      balanceCompanyId
      rs
      ks
      sprBank {
        bank_NAME
        bank_OGRN
        bank_BIK
        bank_INN
        bank_KRS
      }
      balanceCompany {
        id
        name
        adress
        phone
        email
        inn
        kpp,
        okpo,
        ogrn_OgrnIP,
        sprTypeBalanceCompanyId 
      }
 
    }
  }

  
`;


export const READ_OU_ITEM = gql`  
query CompanyBills($id:ID ) {
  companyBills(id:$id ) {
      id
      balanceCompanyId
      rs
      ks
      sprBank {
        bank_NAME
        bank_OGRN
        bank_BIK
        bank_INN
        bank_KRS
      }
      balanceCompany {
        id
        name
        adress
        phone
        email
        inn
        kpp,
        okpo,
        ogrn_OgrnIP,
        sprTypeBalanceCompanyId
      }
    
  }
}
`

export const Get_bik = gql`  
query sprBank{
  sprBank {
    bank_BIK,
    bank_NAME,
    bank_INN,
    bank_KRS,
    bank_OGRN,
    __typename
  }
  }
`