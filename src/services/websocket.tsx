import { Middleware, MiddlewareAPI } from 'redux';
import { TAppDispatch, TRootState } from "./store";
import { TWSActions, WSActionTypes } from "../types/types";
import { WSAllActions } from "./actions/ws";

export const socketMiddleware = (wsActions: WSAllActions): Middleware  => {
    return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return (next: (a: TWSActions) => void) => (action: TWSActions) => {
            const { dispatch } = store;
            const { type } = action;

            const { WSSuccess, WSError, WSClosed, WSGet, WSSend } = wsActions;

            if (type === WSActionTypes.WS_START) {
                const { wsUrl } = action;
                socket = new WebSocket(wsUrl);

                if (socket) {
                    socket.onmessage = (event: any)  => {
                        const { data } = event;
                        const parsedData = JSON.parse(data);
                        const { success, ...restParsedData } = parsedData;
                        dispatch(WSGet(restParsedData));
                    };

                    socket.onopen = (event: any) => {
                        dispatch(WSSuccess(event));
                    };

                    socket.onclose = (event: any)  => {
                        dispatch(WSClosed(event));
                    };

                    socket.onerror = (event: any)  => {
                        dispatch(WSError(event));
                    };
                }
            } else if (socket && type === WSActionTypes.WS_END) {
                socket.close();
                console.log('socket closed');
            } else if (socket && type === WSActionTypes.WS_SEND) {
                const { payload } = action;
                const message = { ...payload };
                dispatch(WSSend(JSON.stringify(message)))
            }

            next(action);
        };
    };
};