import ReactDOM from 'react-dom';
import React  from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';


const Modal = (props) => {
	const winCls = props.title ? styles.window_with_title : styles.window_wo_title,

		  headerCls = props.title ? styles.header_with_title : styles.header_wo_title,

		  closeByEsc = (event) => {
			  if (event.key === "Escape") {
				  props.onClickClose();
			  }
		  };

	React.useEffect(() => {
		document.addEventListener('keydown', closeByEsc);
		return () => {
			document.removeEventListener('keydown', closeByEsc);
		}
	});

	return props.visible && ReactDOM.createPortal (
		props.visible &&
			<ModalOverlay onClick = {props.onClickClose}>
				<div className = {winCls}>
					<header className = {headerCls}>
						{props.title &&
							<p className = 'text text_type_main-medium'>
								{props.title}
							</p>
						}
						<div className = {styles.button} onClick={props.onClickClose}>
							<CloseIcon type="primary"/>
						</div>
					</header>

					{props.children}
				</div>
			</ModalOverlay>,
		document.getElementById('react-modals')
	)
};

Modal.propTypes = {
	onClickClose: PropTypes.func.isRequired,
	title:        PropTypes.string,
	children:     PropTypes.node.isRequired,
	visible:      PropTypes.bool.isRequired,
};

export default Modal;
