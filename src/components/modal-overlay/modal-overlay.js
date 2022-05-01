import React from "react";
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {

    const onClickOverlay = (event) => {
        if (event.target === event.currentTarget) {
            props.onClick();
        }
    };

    return (
        <div className = {styles.mask} onClick = {onClickOverlay}>
          {props.children}
        </div>
    );
};

ModalOverlay.propTypes = {
    onClick:  PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalOverlay;