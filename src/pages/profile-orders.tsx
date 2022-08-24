import React, { useEffect } from 'react';
import styles from './profile-orders.module.css';
import {v4 as idv4} from 'uuid';
import { OrderItem } from "../components/order-item/order-item";
import { useAppSelector } from "../hooks";
import { useDispatch } from "react-redux";
import { TOrder } from "../types/types";
import {ProfileNavigation} from "../components/profile-navigation/profile-navigation";
import { WSClose, WSStart } from "../services/actions/ws";
import {getCookie} from "../services/urls";

export function ProfileOrders() {
    const dispatch = useDispatch();
    const { orders } = useAppSelector(store => store.ws);
    const accessToken = (getCookie('accessToken') as string).replace('Bearer ', '');
    const wsUrl = 'wss://norma.nomoreparties.space/orders';
    const url = accessToken ? `${wsUrl}?token=${accessToken}` : wsUrl;

    useEffect(() => {
        dispatch(WSStart(url));
        return () => {
            dispatch(WSClose());
        }
    },[]);

    return (
        <>
            <div className={styles.profileContent + ' pl-5 pt-30'}>
                <ProfileNavigation/>
            
                    <div className={styles.ordersContainer + ' pr-2'}>
                       {
                            
                            orders ?
                            orders.map((order:TOrder) => {
                                return (
                                    <OrderItem key={idv4()} {...order} profile={true}/>
                                )
                            }) : ('Вы еще не сделали ни одного заказа')
                        }
                    </div>
            </div>
        </>
    );
}