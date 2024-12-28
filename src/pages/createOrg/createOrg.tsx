import InputComponent from "../../components/imput-component/InputComponent";
import { FC, useCallback, useEffect, useState } from "react";
import { useFormCallback } from "../../utils/use-form-callback";
import {
  ApolloClient,
  gql,
  InMemoryCache,
  useApolloClient,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import { TUOorg } from "../../utils/typesTS";
import Loader from "../../components/loader/Loader";
import { UPDATE_UO } from "../../apollo/updateUO";
import { READ_OU_ITEM } from "../../apollo/GetUOorg";
import { useNavigate, useParams } from "react-router-dom";
import accountStore from "../../services/accountsStore";
import imgBin from "../../img/ic-bin.svg"



type TState = TUOorg;

const CreateOrg: FC = () => {

    const navigate = useNavigate();

  var userInfo = accountStore((state) => state);
  let { id } = useParams();
  const [infoUO, setInfoUO] = useState<TState>({ 
    id: 1,
    adress: "",
    email: "",
    inn: "",
    kpp: "",
    bank_KRS: "",
    name: "",
    ogrn_OgrnIP: "",
    okpo: "",
    phone: "",
    bank_BIK: "",
    bank_INN: "",
    bank_OGRN: "",
    rs: "",
    ks:"",
    balanceCompanyId:"",
    bank_NAME:"",
    sprTypeBalanceCompany: { compType: ""  , id:1},
    typeOrg:""
    });



  const onChange = (event: any) => {
    const { name, value } = event.target;
    setInfoUO((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const {
      id,
      adress,
      email,
      inn,
      kpp,
      bank_KRS,
      bank_INN,
      bank_NAME,
      bank_OGRN,
      sprTypeBalanceCompany,
      name,
      ogrn_OgrnIP,
      okpo,
      phone,
      bank_BIK,  
      rs,
      ks,
      balanceCompanyId,
    } = infoUO;

    
    // Execute the mutation
    updateUO({
      variables: {
      id,
      adress,
      email,
      inn,
      kpp,
      name,
      ogrn_OgrnIP,
      okpo,
      phone,
      rs,
      sprTypeBalanceCompanyId:infoUO.typeOrg,
      balanceCompanyId,
      sprBankId:bank_BIK,
      bank_BIK:bank_BIK,
      bank_INN,
      bank_KRS,
      bank_NAME,
      bank_OGRN,
      compType:sprTypeBalanceCompany.compType , 
      compId:sprTypeBalanceCompany.id ,
      ks,
      client_ID:userInfo.userID

      },
    });

    //navigate('/registerUO');
  
  };


 


  
  const { data, loading, error } = useQuery(READ_OU_ITEM, {
    //fetchPolicy: "cache-only",
    variables:{id} ,
  });


  const [
    updateUO,
    { data: data_upd_UO, loading: loading_upd_UO, error: error_upd_UO },
  ] = useMutation(UPDATE_UO);

  useEffect(() => {
    if (data) {
      // const info = data?.companyBills.filter(
      //   (f: any) => f.balanceCompanyId == id
      // )[0];
      setInfoUO({
        id:  data.companyBills.id,
        adress: data.companyBills.balanceCompany.adress,
        email: data.companyBills.balanceCompany.email,
        inn: data.companyBills.balanceCompany.inn,
        kpp: data.companyBills.balanceCompany.kpp,
        bank_KRS: data.companyBills.ks,
        name: data.companyBills.balanceCompany.name,
        ogrn_OgrnIP: data.companyBills.balanceCompany.ogrn_OgrnIP,
        okpo: data.companyBills.balanceCompany.okpo,
        phone: data.companyBills.balanceCompany.phone,
        bank_BIK: data.companyBills.sprBank.bank_BIK,
        bank_INN: data.companyBills.sprBank.bank_INN,
        bank_OGRN: data.companyBills.sprBank.bank_OGRN,
        rs:data.companyBills.rs,
        sprTypeBalanceCompany: { compType: data.companyBills.balanceCompany.sprTypeBalanceCompany.compType , id:data.companyBills.balanceCompany.sprTypeBalanceCompany.id },
        bank_NAME:data.companyBills.sprBank.bank_NAME,
        balanceCompanyId:data.companyBills.balanceCompanyId,
        ks:data.companyBills.ks,
        typeOrg:data.companyBills.balanceCompany.sprTypeBalanceCompany.id
      });
console.log(data)
      
    }
  }, [data]);

 

  

  console.log(infoUO);
  //console.log(state);

  // const client = useApolloClient()
  // // получаем кешированную задачу с `id === 5`
  // const  todo  = client.readQuery({
  //   query: READ_TODO,
  //   variables: { // передаем переменную
  //     id: id
  //   },
  // })

  //console.log(data)

  if (loading) return <Loader />;
  if (error) return <div>${error.message}</div>;
  if (loading_upd_UO) return <Loader />;
  if (error_upd_UO) return <div>${error_upd_UO.message}</div>;

  return (
    <div className="col-sm-12 p-0">
      <div className="row p-4 m-0">
        <div className="col-lg-6 col-sm-12">
        {/* {infoUO && ( */}
          <form
            className="bgWhite rounded16 shadow w-100 p-4"
            onSubmit={handleSubmit}
          >
            <div className="flexHoriz w-100">
              <h2 className="font24b textBlack">{infoUO.name}</h2>
              <button id="DeleteUO" className="transp border-0 ml-auto">
                                <img src={imgBin} className="mr-3 position-absolute d-flex ml-n4 " alt=""></img>
                                <span id="delspan" className="font16b reddish">Удалить организацию</span>
                            </button>
            </div>

            <div className="flexHoriz justify-content-between mt-3">
                            <div className="posRel w-100 mb-3">
                            <label className="transp backLab">Вид организации*</label>
                                <select name="typeOrg" title="Вид организации" defaultValue={infoUO.sprTypeBalanceCompany.id} onChange={onChange} className="select2-hidden-accessible" >
                                    <option value={2}>Индивидуальный предприниматель</option>
                                    <option value={1}>Юридическое лицо</option>
                                </select>                   
                                
                            </div>

                        </div>

    

            <InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.inn}
              children="ИНН*"
              name="inn"
              classCss="inn"
              id_name="INN"
              required={true}
              maxLength={10}
            />

            <InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.ogrn_OgrnIP}
              children="ОГРН*"
              name="ogrn_OgrnIP"
              classCss="OGRN"
              id_name="ogrn_OgrnIP"
              disabled={false}
              required={true}
              maxLength={13}
            />

            <InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.name}
              children="Наименование организации*"
              name="name"
              classCss="NAME"
              id_name="name"
              required={true}
            />

            <InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.kpp}
              children="КПП*"
              name="kpp"
              classCss="KPP"
              id_name="kpp"
              required={true}
              maxLength={10}
            />

            <InputComponent
              type={"text"}
              onChange={onChange}
              value={infoUO.okpo}
              children="ОКПО*"
              name="okpo"
              classCss={"OKPO"}
              id_name="okpo"
              required={true}
              maxLength={10}
            />

<h5 className="font16b pt-2 pb-1">Юридический адрес</h5>

            <InputComponent
              type="tel"
              onChange={onChange}
              value={infoUO.adress}
              children="Область, город, район, улица"
              name="adress"
              classCss="adr"
              id_name="adress"
            />

        <h5 className="font16b pt-2 pb-1">Банковские реквизиты</h5>

        <InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.bank_BIK}
              children="БИК*"
              name="bank_BIK"
              classCss="bik"
              id_name="bank_BIK"
              required={true}
              maxLength={9}
            />

<InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.bank_NAME}
              children="Наименование банка"
              name="bank_NAME"
              classCss="BNAME"
              id_name="bank_NAME"
              disabled={true}
            />

<InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.ks}
              children="Корреспондентский счет"
              name="ks"
              classCss="BKRS"
              id_name="ks"
              maxLength={20}
              disabled={true}

            />
            <InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.rs}
              children="Расчетный счет*"
              name="rs"
              classCss="RS"
              id_name="rs"
              required={true}
              maxLength={20}
            />

<h5 className="font16b pt-2 pb-1">Контактные данные</h5>

<InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.phone}
              children="Номер телефона*"
              name="phone"
              classCss="tlf"
              id_name="phone"
              required={true}
            />

<InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.email}
              children="E-mail"
              name="email"
              classCss="mail"
              id_name="email"
            />

            <div className="row mt-3 mb-3">
              <div className="col-sm-12">
                <button className="btn btn1 h56 mr-2" type="submit">
                  <strong>Сохранить изменения</strong>
                </button>
              </div>
            </div>
          </form>
        {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default CreateOrg;
