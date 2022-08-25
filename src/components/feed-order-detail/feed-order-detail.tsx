import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import styles from './feed-order-detail.module.css';
import {v4 as idv4} from 'uuid';
import { useAppSelector } from "../../hooks";
import { TIngredient } from "../../types/types";
import * as React from "react";
import { useParams } from "react-router-dom";
import {convertDate} from "../../utils/common";

export const FeedOrderDetail: FC = () => {
    const { id } = useParams();

    const { orders } = useAppSelector(store => store.ws);

    const order = orders && orders.find(item => item._id === id);

    const status = order && order.status === 'done' ? 'Выполнен' :
        order && order.status === 'created' ? 'Создан' : 'Готовится';

    const raw = useAppSelector(store => store.store.raw);

    const [ingredients, setIngredients] = useState<TIngredient[]>([]);

    const [totalPrice, setTotalPrice] = useState<number>(0);

    const items: TIngredient[] = [];

    ingredients.forEach((item:TIngredient) => {
        const found = items.find((i:TIngredient) => i._id === item._id);
        if (!found) {
            items.push({...item, used:1});
        } else {
            found.used = (found.used || 0) + 1;
        }
    });

    useEffect(() => {
        let items: TIngredient[] = [];
        let price = 0;
        if (order?.ingredients.length) {
            order.ingredients.forEach((id: string) => {
                const ingredient = raw.find((item: TIngredient) => item._id === id);

                if (ingredient) {
                    const someone = items.find((i:TIngredient) => i._id === ingredient._id);

                    if (!someone) {
                        items.push({...ingredient, used:(ingredient.type === 'bun' ?  2  : 1)});
                        price += ingredient.price * (ingredient.type === 'bun' ?  2  : 1);
                    } else {
                        someone.used = (someone.used || 0) + 1;
                        price += someone.price;
                    }
                }
            })
        }
        setIngredients(items);
        setTotalPrice(price);
    }, [order]);

    return (
        <>
            { order && (
                <>
                    <div className={`${styles.name} mt-10 mb-3 text text_type_main-medium`}>{order.name}</div>
                    <div className={`${styles.status} mb-15`}>{status}</div>
                    <div className='mb-6 text text_type_main-medium'>Состав:</div>
                    <div className={`${styles.list} pr-6 mb-10`}>
                        {
                            ingredients.map((ingredient: TIngredient) => {
                                return (
                                    <div key={ idv4()} className={styles.item + ' pb-4'}>
                                        <div className={styles.row}>
                                            <img src={ingredient.image} alt="" />
                                            <div className='pr-4 pl-4 text text_type_main-default'>{ingredient.name}</div>
                                        </div>
                                        <div className={styles.row}>
                                            <span className='pr-4'>{ingredient.used} x {ingredient.price}</span>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.bbar}>
                        <div className={styles.date}>{convertDate(order.updatedAt)}</div>
                        <div className={styles.price}>
                            <span className='pr-4 pl-6 text text_type_digits-default'>{totalPrice}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </>
            )}

        </>
    )

};