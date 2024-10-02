import {FC} from 'react';
import styles from '../modal-overlay/modal-overlay.module.css'


type TProps ={
    onClick:()=>void;
}


const ModalOverlay:FC<TProps> = ({ onClick }) => {
    return (
        <div data-test="modal-overlay" className={styles.overlay} onClick={onClick} />
    )
}



export default ModalOverlay