import React, { FC } from "react";
import styles from './ingredient-icon.module.css';
import {useAppSelector} from "../../hooks";
import {TIngredient} from "../../types/types";


type TOrderIcon = {
    ingredientId:       string | undefined,
    style?:             React.CSSProperties,
    last:               boolean,
    hiddenIngredients?: number
}

export const IngredientIcon : FC<TOrderIcon> = ({ingredientId, style, last, hiddenIngredients}) => {

    const ingredients:TIngredient[] = useAppSelector(state => state.store.raw);

    const item = ingredients.find(obj => obj._id === ingredientId);

    return (
        <div className={styles.item_icon} style={style}>
            {
                last && (<span>+ {hiddenIngredients}</span>)
            }
            {item && <img src={item.image_mobile}/>}
        </div>
    )
};