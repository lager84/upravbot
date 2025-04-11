import InputComponent from "../../components/imput-component/InputComponent";
import { FC, useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { TUOorg, TsprBank } from "../../utils/typesTS";
import Loader from "../../components/loader/Loader";
import { UPDATE_UO , DELETE_UO, CREATE_UO } from "../../apollo/updateUO";
import { READ_OU_ITEM, Get_bik } from "../../apollo/GetUOorg";
import { useNavigate, useParams } from "react-router-dom";
import accountStore from "../../services/accountsStore";
import imgBin from "../../img/ic-bin.svg";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { URL_REGISTER_UO } from "../../utils/routes";

type TState = TUOorg;
type TStateBIK = TsprBank;

const CreateOrg: FC = () => {
  const navigate = useNavigate();

  var userInfo = accountStore((state) => state);


  const [itemsBik, setItemsBik] = useState<TStateBIK[]>([]);
  const [getBIK, { loading: loadingBIK, error: errorBIK, data: dataBIK }] =
    useLazyQuery(Get_bik);
  const [filteredBIK, setFilteredBIK] = useState<TStateBIK[]>();




  const search = (event: AutoCompleteCompleteEvent) => {
    let _filteredBIK;

    if (!event.query.trim().length) {
      _filteredBIK = [...itemsBik];
    } else {
      _filteredBIK = itemsBik.filter((BIK) => {
        return BIK.bank_BIK.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredBIK(_filteredBIK);
  };

  const onClickBIK = () => {
    getBIK();
    if (dataBIK) {
      setItemsBik(dataBIK.sprBank);
    }
  };

  const [infoUO, setInfoUO] = useState<TState>({
    id: 1,
    adress: "",
    email: "",
    inn: "",
    kpp: "",
    name: "",
    ogrn_OgrnIP: "",
    okpo: "",
    phone: "",
    sprBank: {
      bank_BIK: "",
      bank_NAME: "",
      bank_KRS: "",
      bank_INN: "",
      bank_OGRN: "",
    },
    rs: "",
    ks: "",
    balanceCompanyId: "",
    sprTypeBalanceCompany: "1",
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
      sprBank: { bank_NAME, bank_KRS, bank_INN, bank_OGRN },
      name,
      ogrn_OgrnIP,
      okpo,
      phone,
      rs,
      ks,
      balanceCompanyId,
    } = infoUO;

    // Execute the mutation
    createUO({
      variables: {
        adress,
        email,
        inn,
        kpp,
        name,
        ogrn_OgrnIP,
        okpo,
        phone,
        rs,
        sprTypeBalanceCompanyId: Math.floor(
          parseFloat(infoUO.sprTypeBalanceCompany)
        ),
        sprBankId: infoUO.sprBank.bank_BIK,
        ks:infoUO.sprBank.bank_KRS,
        client_ID: userInfo.userID,
      },
    });
  };


  const [
    createUO,
    { data, loading, error },
  ] = useMutation(CREATE_UO, {
    onCompleted: () => {
      navigate(-1);
    },
  });



  console.log(infoUO);

  if (loading) return <Loader />;
  if (error) return <div>${error.message}</div>;
  if (loadingBIK) return <Loader />;
  if (errorBIK) return <div>{errorBIK.message}</div>;

  return (
    <div className="col-sm-12 p-0">
      <div className="row p-4 m-0">
        <div className="col-lg-6 col-sm-12">
          <form
            className="bgWhite rounded16 shadow w-100 p-4"
            onSubmit={handleSubmit}
          >
            <div className="flexHoriz w-100">
              <h2 className="font24b textBlack">Создание Управляющей организации</h2>
            </div>

            <div className="flexHoriz justify-content-between mt-3">
              <div className="posRel w-100 mb-3">
                <label className="transp backLab">Вид организации*</label>
                <select
                  name="sprTypeBalanceCompany"
                  title="Вид организации"
                  value={infoUO.sprTypeBalanceCompany}
                  onChange={onChange}
                  className="select2-hidden-accessible"
                >
                  <option value={1}>{"Юридическое лицо"}</option>
                  <option value={2}>{"Индивидуальный предприниматель"}</option>
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

            <div className="w-100 flexHoriz flex-wrap justify-content-between">
              <div className="posRel w-100 mb-3">
                <AutoComplete
                  unstyled
                  type="text"
                  name="sprBank"
                  className="bik"
                  id="sprBank"
                  required={true}
                  maxLength={9}
                  value={infoUO.sprBank}
                  suggestions={filteredBIK}
                  completeMethod={search}
                  onClick={onClickBIK}
                  onChange={onChange}
                  field="bank_BIK"
                  panelStyle={{ background: "white", overflowY: "scroll" }}
                />
                <label className="transp backLab" htmlFor="bank_BIK">
                  БИК*
                </label>
              </div>
            </div>

            <InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.sprBank.bank_NAME}
              children="Наименование банка"
              name="bank_NAME"
              classCss="BNAME"
              id_name="bank_NAME"
              disabled={true}
            />

            <InputComponent
              type="text"
              onChange={onChange}
              value={infoUO.sprBank.bank_KRS}
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
                  <strong>Сохранить</strong>
                </button>
                <button onClick={() => navigate(-1)} type="button" className="btn btn1 h56 outline shadow-none flexCenter" id="backUo">Назад</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrg;
