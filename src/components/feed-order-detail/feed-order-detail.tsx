import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import styles from './feed-order-detail.module.css';
import {v4 as idv4} from 'uuid';
import { useAppSelector } from "../../hooks";
import { TIngredient } from "../../types/types";
import * as React from "react";
import { useParams } from "react-router-dom";

export const FeedOrderDetail: FC = () => {
    const { id } = useParams();

    const { orders } = useAppSelector(store => store.ws);

    const order = orders && orders.find(item => item._id === id);

    const ingredientData = useAppSelector(store => store.store.raw);
    const [ingredients, setIngredients] = useState<TIngredient[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        let ing: TIngredient[] = [];
        let price = 0;
        if (order?.ingredients.length) {
            order.ingredients.forEach((id: string) => {
                const findedIngredient = ingredientData.find((i: TIngredient) => i._id === id);
                if (findedIngredient) {
                    ing.push(findedIngredient);
                    price += findedIngredient.price * (findedIngredient.type === 'bun' ?  2  : 1);
                }
            })
        }
        setIngredients(ing);
        setTotalPrice(price);
    },[order]);

    console.log(order);
    console.log(orders);
    console.log(id);


    return (
        <>
            { order && (
                <>
                    <div className={styles.orderName + ' mt-10 mb-3 text text_type_main-medium'}>{order.name}</div>
                    <div className={styles.status +' mb-15'}>{order.status}</div>
                    <div className='mb-6 text text_type_main-medium'>Состав:</div>
                    <div className={styles.ingredientsContainer + ' pr-6 mb-10'}>
                        {
                            ingredients.map((ingredient: TIngredient) => {
                                return (
                                    <div key={ idv4()} className={styles.ingredientsContainerItem + ' pb-4'}>
                                        <div className={styles.imgAndName}>
                                            <img className={styles.orderItemIngredientImage} src={ingredient.image} alt="" />
                                            <div className='pr-4 pl-4  text text_type_main-default'>{ingredient.name}</div>
                                        </div>
                                        <div className={styles.price}>
                                            <span className='pr-4'>{ingredient.type === 'bun' ? '2' : '1'} x {ingredient.price}</span> <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.orderItemDate}>{order.updatedAt}</div>
                        <div className={styles.price}>
                            <span className='pr-4 pl-6 text text_type_digits-default'>{totalPrice}</span> <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </>
            )}

        </>
    )

}