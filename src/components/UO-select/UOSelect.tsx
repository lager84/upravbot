import { FC, useEffect, useState } from "react";
import { TBalanceCompany } from "../../utils/typesTS";
import accountStore from "../../services/accountsStore";
import { useQuery } from "@apollo/client";
import Loader from "../loader/Loader";
import { GET_UO_ORG_LIGHT } from "../../apollo/GetUOorg";
import { selectedOUVar } from "../../apollo/client";

type TState = Omit<
  TBalanceCompany,
  | "adress"
  | "phone"
  | "email"
  | "inn"
  | "kpp"
  | "okpo"
  | "ogrn_OgrnIP"
  | "sprTypeBalanceCompany"
  | "cBid"
>;

type TProp = {
  cardId: number;
};
const UOSelect: FC<TProp> = ({ cardId }) => {
  var userInfo = accountStore((state) => state);
  const client_ID = userInfo.userID;

  const [UO, setUO] = useState<TState>({
    id: cardId,
    name: "Выберите УК *",
  });

  const { data, loading, error } = useQuery(GET_UO_ORG_LIGHT, {
    variables: { client_ID },
  });

  useEffect(() => {
    selectedOUVar(cardId);
  }, [cardId]);

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setUO((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    selectedOUVar(Math.floor(parseFloat(value || "")));
  };

  if (loading)
    return (
      <>
        <Loader />
      </>
    );

  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <div className="posRel flex-grow-1 mr-3">
      <label className="transp backLab">Управляющая организация *</label>
      <select
        name="id"
        title="Управляющая организация"
        value={UO.id}
        onChange={onChange}
        className="pt-3 select2-hidden-accessible"
        required
      >
        {cardId === -1 && <option value={cardId}>{UO.name}</option>}
        {data &&
          data.balanceCompany.map((ditail: TState) => (
            <option key={ditail.id} value={ditail.id}>
              {ditail.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default UOSelect;
