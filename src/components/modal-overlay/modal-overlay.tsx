import React, {SyntheticEvent} from "react";
import styles from './modal-overlay.module.css'

interface IModalOverlay {
    onClick: () => void;
    children: React.ReactNode
}

const ModalOverlay: React.FC<IModalOverlay> = ({onClick, children}) => {

    const onClickOverlay = (event: SyntheticEvent) => {
        if (event.target === event.currentTarget) {
            onClick();
        }
    };

    return (
        <div className = {styles.mask} onClick = {onClickOverlay}>
          {children}
        </div>
    );
};

export default ModalOverlay;