import React, {useEffect} from "react";
import styles from './order-details.module.css';
import { FeedOrderDetail } from "../components/feed-order-detail/feed-order-detail";
import {useDispatch} from "react-redux";
import {WSClose, WSStart} from "../services/actions/ws";
import {getCookie} from "../services/urls";

export const PageOrderDetail = ({isFeed}:{isFeed?:boolean}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (isFeed) {
            dispatch(WSStart('wss://norma.nomoreparties.space/orders/all'));

        } else {
            const accessToken = (getCookie('accessToken') as string).replace('Bearer ', '');
            const wsUrl = 'wss://norma.nomoreparties.space/orders';
            const url = accessToken ? `${wsUrl}?token=${accessToken}` : wsUrl;
            dispatch(WSStart(url));
        }
        return () => {
            dispatch(WSClose());
        }
    },[]);

    return (
        <div className={styles.panel}>
            <FeedOrderDetail/>
        </div>
    )
};