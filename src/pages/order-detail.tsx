import React, { useEffect } from "react";
import styles from './order-details.module.css';
import { FeedOrderDetail } from "../components/feed-order-detail/feed-order-detail";
import { WSClose, WSStart } from "../services/actions/ws";
import { baseWsUrl, getCookie } from "../services/urls";
import { useAppDispatch } from "../hooks";

export const PageOrderDetail = ({isFeed}:{isFeed?:boolean}) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isFeed) {
            dispatch(WSStart(baseWsUrl + '/orders/all'));

        } else {
            const accessToken = (getCookie('accessToken') as string).replace('Bearer ', '');
            const wsUrl = baseWsUrl + '/orders';
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