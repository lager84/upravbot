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
  sprTypeBalanceCompany:string;
  cBid?:string;

}



export type TUOorg = TBalanceCompany &  {
  id:number
  balanceCompanyId:string
  rs:string
  ks:string
  sprBank:TsprBank
};

export type TsprBank = {
bank_NAME?:string
bank_OGRN?:string
bank_BIK:string
bank_INN?:string
bank_KRS:string 
}


export type TsprProject =
{
  id:number
  projectName:string
  client_id?:string
}

export type TSortState = {
  sortName:string;
}

export type TsprObjectFull = {
  gilFindObjects:TsprObject
}

export type sprStreet = {
  id: number,
  oblast:string,
  city:string,
  sName:string,
  raion?:string
  client_ID:string

}
        
export type gilFindProject = {
  projectName:string
}

export type balanceCompany={
name: string,
client_ID: string
}

export type TsprObject  =  sprStreet & gilFindProject & balanceCompany &{
  id: number,
  houseNumber: string,
  sprStreetId: number,
  gilFindProjectId: number,
  balanceCompanyId: number,
  imageHouse?:string
}

export type sprDisp = {
    id: number,
    dispStatus:boolean,
    phoneDisp?:string,
    dispName:string,
    userId:string
}