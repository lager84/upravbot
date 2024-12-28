import { gql, useMutation } from '@apollo/client';

export const UPDATE_UO = gql`
mutation UpdateOU($compType:String, $compId:Int! ,$bank_OGRN:String ,$bank_NAME:String ,$bank_KRS: String , $bank_INN:String, $id: ID!, $ks: String, $rs: String, $balanceCompanyId: Int!, $sprBankId: String, $inn: String, $adress: String, $sprTypeBalanceCompanyId: Int!, $client_ID: String, $email: String, $kpp: String, $licence: String, $name: String, $ogrn_OgrnIP: String, $okpo: String, $phone: String) {
  updateCompanyBills(
    companyBills: {id: $id, ks: $ks, rs: $rs, balanceCompanyId: $balanceCompanyId, sprBankId: $sprBankId, sprBank:  {
       bank_BIK: $sprBankId,
       bank_INN: $bank_INN,
       bank_KRS: $bank_KRS,
       bank_NAME:$bank_NAME,
       bank_OGRN: $bank_OGRN
    } ,balanceCompany: {id: $balanceCompanyId, inn: $inn, adress: $adress, sprTypeBalanceCompanyId: $sprTypeBalanceCompanyId, sprTypeBalanceCompany:  {
       compType: $compType,
       id: $compId
    } ,client_ID: $client_ID, email: $email, kpp: $kpp, licence: $licence, name: $name, ogrn_OgrnIP: $ogrn_OgrnIP, okpo: $okpo, phone: $phone} }
  ) {
    id
    rs
    ks
    balanceCompanyId
    balanceCompany {
      id
      phone
      email
      inn
      kpp
      okpo
      ogrn_OgrnIP
      name
      client_ID
      sprTypeBalanceCompanyId
      sprTypeBalanceCompany {
        id
        compType
        __typename
      }
      __typename
    }
    sprBankId
    sprBank{
      bank_BIK
      bank_NAME
      bank_INN
      bank_KRS
      bank_OGRN
      __typename
    }
    __typename
  }
}
`