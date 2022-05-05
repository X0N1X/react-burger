import React from 'react';
import styles from './ingredients-details.module.css';
import PropTypes from 'prop-types';


const IngredientDetails = (props) => {
	const digitsCls = 'text text_type_digits-default text_color_inactive',
		  labelCls  = 'text text_type_main-small text_color_inactive',
		  nameCls   = styles.name + ' text text_type_main-default';

	return (
		<div className = {styles.panel}>
			<img src={props.image_large} alt={props.name}/>
			<div className = {nameCls}>
                {props.name}
			</div>
            <ul className = {styles.list}>
                <li className = {styles.item}>
                    <div className = {labelCls}>
                        Калории, калл
                    </div>       
                    <div className = {digitsCls}>
                        {props.calories}
                    </div>                                  
                </li>
                <li className = {styles.item}>
                    <div className = {labelCls}>
                        Белки, г
                    </div>       
                    <div className = {digitsCls}>
                        {props.proteins}
                    </div>                                  
                </li>
                <li className = {styles.item}>
                    <div className = {labelCls}>
                        Жиры, г
                    </div>       
                    <div className = {digitsCls}>
                        {props.fat}
                    </div>                                  
                </li>
                <li className = {styles.item}>
                    <div className = {labelCls}>
                        Углеводы, г
                    </div>
                    <div className={digitsCls}>
						{props.carbohydrates}
                    </div>
                </li>
            </ul>			
		</div>   
	)
};

IngredientDetails.propTypes = {
	name:          PropTypes.string.isRequired,
	image_large:   PropTypes.string.isRequired,
	calories:      PropTypes.number.isRequired,
	proteins:      PropTypes.number.isRequired,
	fat:           PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired
};

export default IngredientDetails;
