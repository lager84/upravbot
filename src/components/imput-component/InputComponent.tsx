import styles from "../imput-component/imput.module.css";
import { FC, useState } from "react";

type TProps = {
    id_name:string;
    children:string;
    value:string;
    type?: 'text' | 'email' | 'password' | 'tel';
    name:string;
    disabled?: boolean;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
    onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
    onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
} 

const InputComponent:FC<TProps> = ({children , id_name, value , type , name, onChange  }) =>{
    
   

return(
    <div>
<input type={type} onChange={onChange} name={name} value={value || "" } id={id_name} className={styles.inputC}></input>
<label className={styles.lableC} htmlFor={id_name} >{children}</label>
                            
    </div>
)
};

export default InputComponent;