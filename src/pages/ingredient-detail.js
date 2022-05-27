import React from "react";
import IngredientDetails from "../components/ingredients-details/ingredients-details";
import styles from './ingredient.module.css';

export function PageIngredientDetail() {
    return (
        <div className={styles.panel}>
            <IngredientDetails/>
        </div>
    )
}