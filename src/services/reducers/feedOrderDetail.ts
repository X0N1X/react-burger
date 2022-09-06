import { TOrder } from "../../types/types";
import { REQUEST, SUCCESS, ERROR, OPEN, CLOSE, TFeedOrderDetailActions } from '../actions/feedOrderDetail';

type TFeedOrder =  {
    order:        TOrder | null,
    orderRequest: boolean,
    orderFailed:  boolean
    isOpen:       boolean
}

export const initState: TFeedOrder = {
    order:        null,
    isOpen:       false,
    orderRequest: false,
    orderFailed:  false
};

export const feedOrderDetail = (state: TFeedOrder = initState, action: TFeedOrderDetailActions): TFeedOrder => {
    switch (action.type) {
        case REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case SUCCESS: {
            return {
                ...state,
                orderFailed:  false,
                order:        action.order,
                orderRequest: false
            };
        }
        case ERROR: {
            return {
                ...state,
                orderRequest: false
            };
        }

        case OPEN: {
            return {
                ...state,
                order:  action.order,
                isOpen: action.isOpen
            };
        }
        case CLOSE: {
            return {
                ...state,
                isOpen: action.isOpen
            };
        }
        default:
            return state
    }
};