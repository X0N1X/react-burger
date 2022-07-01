import React, { useMemo } from 'react';
import styles from './ingredients-details.module.css';
import { useAppSelector } from "../../hooks";
import { useParams } from 'react-router-dom';
import {TIngregient} from "../../types/types";


const IngredientDetails = () => {
	const digitsCls = 'text text_type_digits-default text_color_inactive',
		  labelCls  = 'text text_type_main-small text_color_inactive',
		  nameCls   = styles.name + ' text text_type_main-default';

	const { ingredientId } = useParams();
	const ingredients:TIngregient[] = useAppSelector(state => state.store.raw);
	const ingredient = useMemo(() => (
		ingredients.find(item => item._id === ingredientId)
	), [ingredients, ingredientId]);

	return ingredient ? (
		<div className = {styles.panel}>
			<img src={ingredient.image_large} alt={ingredient.name}/>
			<div className = {nameCls}>
                {ingredient.name}
			</div>
            <ul className = {styles.list}>
                <li className = {styles.item}>
                    <div className = {labelCls}>
                        Калории, калл
                    </div>       
                    <div className = {digitsCls}>
                        {ingredient.calories}
                    </div>                                  
                </li>
                <li className = {styles.item}>
                    <div className = {labelCls}>
                        Белки, г
                    </div>       
                    <div className = {digitsCls}>
						{ingredient.proteins}
                    </div>                                  
                </li>
                <li className = {styles.item}>
                    <div className = {labelCls}>
                        Жиры, г
                    </div>       
                    <div className = {digitsCls}>
                        {ingredient.fat}
                    </div>                                  
                </li>
                <li className = {styles.item}>
                    <div className = {labelCls}>
                        Углеводы, г
                    </div>
                    <div className={digitsCls}>
						{ingredient.carbohydrates}
                    </div>
                </li>
            </ul>			
		</div>   
	) : (<></>)
};

export default IngredientDetails;
