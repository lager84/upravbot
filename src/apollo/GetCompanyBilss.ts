import { gql } from '@apollo/client';

export const GET_COMPANY_BILLS = gql` 
query CompanyBills ($balanceCompanyId: Int!){
  companyBills(where:{ balanceCompanyId: {eq:$balanceCompanyId}}){
    balanceCompanyId,
    rs,
    ks,
    sprBank{
      bank_NAME,
      bank_OGRN,
      bank_BIK,
      bank_INN,
      bank_KRS
    }

  }

}
`;