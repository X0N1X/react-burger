import {TOrder, TWSActions, WSActionTypes} from "../../types/types";

type TWSState = {
    wsConnected: boolean,
    orders:      Array<TOrder> | null,
    total:       number,
    totalToday:  number
}

export const initialState = {
    wsConnected: false,
    orders:      null,
    total:       0,
    totalToday:  0
};

export const ws = (state : TWSState = initialState, action : TWSActions) : TWSState => {
    switch (action.type) {
        case WSActionTypes.WS_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WSActionTypes.WS_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WSActionTypes.WS_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WSActionTypes.WS_END:
            return state;

        case WSActionTypes.WS_GET:
            return {
                ...state,
                orders:     action.payload.orders,
                total:      action.payload.total,
                totalToday: action.payload.totalToday
            };

        default:
            return state;
    }
};