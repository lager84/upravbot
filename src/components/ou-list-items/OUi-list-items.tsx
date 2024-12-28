import { FC } from "react";
import { TBalanceCompany } from "../../utils/typesTS";
import styles from "./OUlistitems.module.css";
import { useNavigate } from "react-router-dom";
import { URL_CREATE_ORG } from "../../utils/routes";

type TProp = {
  card: TBalanceCompany;
};
const UOListItem: FC<TProp> = ({ card }) => {


  const navigate = useNavigate();


  return (
    <div className={styles.divCard} onClick={() => navigate(`${URL_CREATE_ORG}/${card.cBid}`)}>
      <h3 className="h3">{card.name}</h3>

      <div>ИНН: {card.inn}</div>

      <div>ОГРН: {card.ogrn_OgrnIP}</div>

      <div>КПП: {card.kpp}</div>

      <div>ОКПО: {card.okpo}</div>

      {card.adress && <div>Адрес: {card.adress}</div>}

      <div>Телефон: {card.phone}</div>

      {card.email && <div>Email: {card.email}</div>}
    </div>
  );
};

export default UOListItem;
