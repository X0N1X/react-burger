import {
    IWSClose,
    IWSClosed,
    IWSError,
    IWSStart,
    IWSSuccess,
    IWSGet,
    IWSSend,
    TWSActions,
    WSActionTypes
} from "../../types/types";


export const WSStart = (wsUrl: string): IWSStart => {
    return {
        type:  WSActionTypes.WS_START,
        wsUrl: wsUrl
    };
};

export const WSClose = (): IWSClose => {
    return {
        type: WSActionTypes.WS_END
    };
};

export const WSClosed = (payload: any): IWSClosed => {
    return {
        type: WSActionTypes.WS_CLOSED,
        payload: payload
    };
};

export const WSSuccess = (payload: any) : IWSSuccess => {
    return {
        type: WSActionTypes.WS_SUCCESS,
        payload: payload
    };
};

export const WSError = (payload: any): IWSError => {
    return {
        type: WSActionTypes.WS_ERROR,
        payload: payload
    };
};

export const WSGet = (message: any): IWSGet => {
    return {
        type: WSActionTypes.WS_GET,
        payload: message
    };
};

export const WSSend = (message: any): IWSSend => {
    return {
        type: WSActionTypes.WS_SEND,
        payload: message
    };
};

export const WSActions = {
    WSStart,
    WSClose,
    WSSuccess,
    WSError,
    WSClosed,
    WSGet,
    WSSend
};

export type WSAllActions = typeof WSActions;