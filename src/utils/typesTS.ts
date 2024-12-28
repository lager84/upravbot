export type TState = {
  SecondName?: string;
  FirstName?: string;
  GivenName?: string;
  Email?: string;
  password?: string;
  phone_number?: string;
  role?: string[];
  userID?: string;
  wasSubmit?: boolean;
};



export type TBalanceCompany = {
  id: number;
  name: string;
  adress: string;
  phone: string;
  email:string;
  inn: string;
  kpp: string;
  okpo: string;
  ogrn_OgrnIP: string;
  sprTypeBalanceCompany:TsprTypeBalanceCompany;
  cBid?:string;
  
 
}

export type TsprTypeBalanceCompany = {
  id:number
  compType:string
}


export type TUOorg = TBalanceCompany & TsprBank & {
  id:number
  balanceCompanyId:string
  rs:string
  ks:string
  typeOrg:string
};

export type TsprBank = {
bank_NAME:string
bank_OGRN:string
bank_BIK:string
bank_INN:string
bank_KRS:string 
}



