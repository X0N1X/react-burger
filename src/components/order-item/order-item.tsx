import {FC, useEffect, useState} from "react";
import styles from './order-item.module.css';
import { TIngredient, TOrder } from "../../types/types";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import { v4 as idv4 } from "uuid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { convertDate } from "../../utils/common";

export const OrderItem : FC<TOrder>= ({_id, number, name, createdAt, ingredients, status, updatedAt, profile}) => {
    const [price, setPrice] = useState(0);
    const location = useLocation();
    const raw:TIngredient[] = useAppSelector(state => state.store.raw);

    useEffect(() => {
        ingredients.map(obj => {
            raw.find(item => {
                if (item._id === obj) {
                    setPrice(prevState => prevState + item.price)
                }

            })
        })
    }, []);

    return (
        <section className={styles.item}>
            <Link className={styles.item}
                  to    = {profile ? `/profile/orders/${_id}` : `/feed/${_id}`}
                  state = {{background: location}}
            >
                <div className={styles.header}>
                    <p className="text text_type_digits-default">#{number}</p>
                    <p className="text text_type_main-default text_color_inactive">{convertDate(createdAt)}</p>
                </div>

                <div className={`${styles.title} text text_type_main-medium`}>{name}</div>

                <div className={styles.footer}>
                    <div className={styles.ingredients}>
                        {
                            ingredients.map((ingredientId, index) => {
                                const zIndex = ingredients.length - index,
                                    last = index === 5;
                                return index <= 5 && <IngredientIcon
                                    key               = {index}
                                    style             = {{zIndex : zIndex}}
                                    ingredientId      = {ingredientId}
                                    last              = {last}
                                    hiddenIngredients = {zIndex}
                                />
                            })
                        }
                    </div>
                    <div className={`${styles.price} text text_type_digits-default`}>
                        <div>
                            {price}
                        </div>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </Link>
        </section>
    )
};