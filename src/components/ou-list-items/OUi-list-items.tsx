import { FC } from "react";
import { TBalanceCompany } from "../../utils/typesTS";
import styles from "./OUlistitems.module.css";

type TProp = {
  card: TBalanceCompany;
};
const UOListItem: FC<TProp> = ({ card }) => {
  return (
    <div className={styles.divCard}>
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
