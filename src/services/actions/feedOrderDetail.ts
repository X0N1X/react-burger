import {TOrder} from "../../types/types";

export const REQUEST = 'GET_ORDER_REQUEST';
export const SUCCESS = 'GET_ORDER_SUCCESS';
export const ERROR   = 'GET_ORDER_ERROR';
export const OPEN    = 'OPEN_FEED_DETAIL';
export const CLOSE   = 'CLOSE_FEED_DETAIL';

export interface IFeedOrderDetailRequest {
    readonly type: typeof REQUEST;
}
export interface IFeedOrderDetailSuccess {
    readonly type: typeof SUCCESS;
    readonly order: TOrder;
}
export interface IFeedOrderDetailFailed {
    readonly type: typeof ERROR;
}
export interface IShowFeedOrderDetail {
    readonly type: typeof OPEN;
    readonly isOpen: boolean;
    readonly order: TOrder;
}
export interface IHideFeedOrderDetail {
    readonly type: typeof CLOSE;
    readonly isOpen: boolean;
}

export type TFeedOrderDetailActions =
    | IFeedOrderDetailRequest
    | IFeedOrderDetailSuccess
    | IFeedOrderDetailFailed
    | IShowFeedOrderDetail
    | IHideFeedOrderDetail;

export const feedOrderDetailRequest = ():IFeedOrderDetailRequest => ({type:REQUEST});
export const feedOrderDetailSuccess = (order: TOrder):IFeedOrderDetailSuccess => ({type:SUCCESS, order});
export const feedOrderDetailFailed  = ():IFeedOrderDetailFailed => ({type:ERROR});
export const closeFeedOrderDetail   = (): IHideFeedOrderDetail => ({type:CLOSE, isOpen: false});

export const showFeedOrderDetail = (order: TOrder, isOpen: boolean): IShowFeedOrderDetail => ({
    type:   OPEN,
    isOpen: isOpen,
    order:  order
});



//export type TgetFeedOrderDetail = (id: string) =>  AppThunk;

// export const getFeedOrderDetail: TgetFeedOrderDetail = (id: string): AppThunk => (dispatch: Dispatch<TFeedOrderDetailActions>) => {
//     const accessToken = getCookie('accessToken') as string;
//     dispatch(feedOrderDetailRequest());
//     getOrderRequest(id, accessToken).then(json => {
//         if (json && json.success) {
//             console.log('getOrderRequest json:', json.orders[0]);
//             dispatch(feedOrderDetailSuccess(json.orders[0]));
//             dispatch(showFeedOrderDetail(json.orders[0], true));
//         } else {
//             dispatch(feedOrderDetailFailed());
//         }
//     }).catch(error => {
//         console.log('error', error);
//         dispatch(feedOrderDetailFailed());
//     });
// };