import {FC, useEffect, useState} from "react";
import styles from './order-item.module.css';
import {TIngredient, TOrder} from "../../types/types";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {IngredientIcon} from "../ingredient-icon/ingredient-icon";
import {v4 as idv4} from "uuid";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

export const OrderItem : FC<TOrder> = ({_id, number, name, createdAt, ingredients, status, updatedAt}) => {
    const [price, setPrice] = useState(0);
    //const location = useLocation();
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

    const convertDate = (date: string) => {
        return formatRelative(new Date(date), new Date(), {
            locale: ru,
        });
    };

    const onClickItem = () => {
        // if (location.pathname === "/feed") {
        //     history.push(`/feed/${_id}`, {background : location})
        // } else if (location.pathname === "/profile/orders") {
        //     history.push(`/profile/orders/${_id}`, {background : location})
        // }
    };

    return (
        <section className={styles.item} onClick={() => {onClickItem()}}>

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
                                key               = {idv4()}
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

        </section>
    )
};