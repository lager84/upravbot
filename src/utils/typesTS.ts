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
  name: string;
  inn: number;
  email:string;
  id: number;
  ogrn_OgrnIP: number;
  kpp: number;
  okpo: number;
  adress: string;
  phone: string;
  sprTypeBalanceCompany:TsprTypeBalanceCompany
}

export type TUOorg = TBalanceCompany & {
  BIK: number;
  BankName?: string;
  korShet?: number;
  rasShet: number;
  TBankID: number;
};

export type TsprTypeBalanceCompany = {
  compType:string
}


