import ReactDOM from 'react-dom';
import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModal {
	onClickClose: () => void;
	title?:       string;
	children:     React.ReactNode;
	visible:      boolean;
}

const Modal: React.FC<IModal> = ({children, title, visible, onClickClose}) => {
	const winCls = title ? styles.window_with_title : styles.window_wo_title,
		  headerCls = title ? styles.header_with_title : styles.header_wo_title,

		  closeByEsc = (event: KeyboardEvent) => {
			  if (event.key === "Escape") {
				  onClickClose();
			  }
		  };

	React.useEffect(() => {
		document.addEventListener('keydown', closeByEsc);
		return () => {
			document.removeEventListener('keydown', closeByEsc);
		}
	});

	return visible ? ReactDOM.createPortal (
		visible &&
			<ModalOverlay onClick = {onClickClose}>
				<div className = {winCls}>
					<div className = {headerCls}>
						{title &&
							<p className = 'text text_type_main-medium'>
								{title}
							</p>
						}
						<div className = {styles.button} onClick={onClickClose}>
							<CloseIcon type="primary"/>
						</div>
					</div>

					{children}
				</div>
			</ModalOverlay>,
		document.getElementById('react-modals') as Element
	) : null
};

export default Modal;