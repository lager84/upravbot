import { useEffect, useCallback, FC} from 'react';
import styles from '../modal/modal.module.css'
import ModalOverlay from '../modal-overlay/ModalOverlay';
import closeIcon from '../../img/close.svg';






type TProps = {
    title?: string;
    children: React.ReactNode;
    btnClose: (e?:  Event) => void;
}

const Modal:FC<TProps> = ({ title, children, btnClose }) => {


    const checkEsc = useCallback((e:KeyboardEvent) => {
        if (e.key === "Escape") {
            btnClose(e);
        }
    }, [btnClose]);



    useEffect(() => {
        document.addEventListener("keydown", checkEsc, false);

        return () => {
            document.removeEventListener("keydown", checkEsc, false);
        };
    }, [checkEsc]);




    return (
        <>
            <div data-test="modal" className={styles.modalOrder}>
                <div className={styles.ingredient_header}>
                    <h2 className={styles.ingredient_title}>{title}</h2>
                    <div className={styles.order_closeButton}> <img src={closeIcon} onClick={(e) =>btnClose()} className="w24" alt=""></img> </div>
                </div>
                {children}
            </div>
            <ModalOverlay onClick={btnClose} />
        </>

    )
}


export default Modal