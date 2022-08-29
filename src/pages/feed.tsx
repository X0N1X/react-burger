import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect }                      from 'react';
import { WSClose, WSStart }               from '../services/actions/ws';
import styles                             from './feed.module.css';
import { OrderItem }                      from '../components/order-item/order-item';
import { baseWsUrl }                      from "../services/urls";

export const FeedPage = () => {
    const dispatch = useAppDispatch();

    const { orders, total, totalToday } = useAppSelector(store => store.ws);

    useEffect(() => {
       dispatch(WSStart(baseWsUrl+'/orders/all'));
       return () => {
           dispatch(WSClose());
       }
    },[]);

    return (
        <div className={styles.page}>
            <div className='text text_type_main-large pb-10'>Лента заказов</div>
            <div className={styles.panel}>
                <div className={styles.list}>
                    <div className={styles.orders + ' pr-2'}>
                        {
                            orders?.map((order, index : number) => {
                                return (
                                    <OrderItem key={order._id} {...order}/>
                                )
                            })
                        }
                    </div>
                </div>

                    <div className={styles.list}>
                        <div className={styles.order_status}>
                            <div className={styles.list}>
                                <div className='text text_type_main-medium pb-6'>Готовы:</div>
                                <div className={`${styles.order_numbers} ${styles.done_status}`}>

                                    {
                                        orders?.map((order, index : number) => {
                                            if (index % 10 === 0) {}
                                            return (
                                                order.status === "done"
                                                && (<li key={order._id}>{order.number}</li>)
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.list}>
                                <div className='text text_type_main-medium pb-6'>В работе:</div>
                                <div className={styles.order_numbers}>
                                    {
                                        orders?.map(order => {
                                            return (
                                                (order.status !== "done")
                                                && (<li key={order._id}>{order.number}</li>)
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='mt-15'>
                            <div className='text text_type_main-medium'>Выполнено за все время:</div>
                            <div className='text text_type_digits-large'>{totalToday}</div>
                        </div>
                        <div className='mt-15'>
                            <div className='text text_type_main-medium'>Выполнено за все время:</div>
                            <div className='text text_type_digits-large'>{total}</div>
                        </div>
                    </div>

            </div>
        </div>
    )
};