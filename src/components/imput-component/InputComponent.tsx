import styles from "../imput-component/imput.module.css";
import { FC, useState } from "react";

type TProps = {
    id_name:string;
    children:string;
    value:string | number | readonly string[] | undefined;
    type?: 'text' | 'email' | 'password' | 'tel';
    name:string;
    classCss?:string
    disabled?: boolean;
    required?:boolean;
    maxLength?:number;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
    onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
    onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
    
} 

const InputComponent:FC<TProps> = ({children , id_name, value , type, disabled  , classCss , name, onChange ,  required , maxLength }) =>{
    
   

return(
    <div className="w-100 flexHoriz flex-wrap justify-content-between">
    <div className="posRel w-100 mb-3">
<input type={type} onChange={onChange} name={name} value={value || "" } id={id_name} disabled={disabled} required={required} maxLength={maxLength}  className={classCss}></input>
 <label className="transp backLab" htmlFor={id_name} >{children}</label>
</div>                     
</div>
)
};

export default InputComponent;