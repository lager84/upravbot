import { FC } from "react";
import InputComponent from "../imput-component/InputComponent";
import { TBalanceCompany } from "../../utils/typesTS";
import { useFormCallback } from "../../utils/use-form-callback";

type Tprops ={
    detail:TBalanceCompany
}


const DitailUO:FC<Tprops> = (item) => {

  
   
    
    return(
        <form>
             <InputComponent
              type="text"
              onChange={(e)=>e.target.value}
              value={item.detail.name || ""}
              children="Фамилия"
              name="SecondName"
              classCss="SecondName"
              id_name="SecondName"
            />
        </form>
    )
    
}

export default DitailUO