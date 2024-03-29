import { getCookie, deleteCookie, checkResponse, logout as logoutUrl, user as userUrl, fetchWithRefreshToken} from "../urls";
import { TAppDispatch, TAppThunk } from "../store";
import { TProfile } from "../reducers/user";

export const GET_REQUEST = "USER_GET_REQUEST";
export const GET_SUCCESS = "USER_GET_SUCCESS";
export const GET_ERROR   = "USER_GET_ERROR";
export const SET         = 'USER_SET';

export const PATCH_REQUEST = "USER_PATCH_REQUEST";
export const PATCH_SUCCESS = "USER_PATCH_SUCCESS";
export const PATCH_ERROR   = "USER_PATCH_ERROR";

export const LOGOUT = "USER_LOGOUT";

export const setUser = (field:string, value:string) : TAction => ({type: SET, field, value});

export const getUser: TAppThunk = () => {
    return async (dispatch:TAppDispatch) => {
        dispatch({type: GET_REQUEST});
        fetchWithRefreshToken(userUrl, {
            method: 'GET',

            mode:   'cors',
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + getCookie("accessToken"),
            },
        }).then(result => {
            if (result && result.success) {
                dispatch({type: GET_SUCCESS, name: result.user.name, email: result.user.email});
            } else {
                dispatch({type: GET_ERROR});
            }
        }).catch((e) => {
            dispatch({type: GET_ERROR});
        });
    }
};

export const patchUser: TAppThunk = (profile:TProfile) => {
    return async (dispatch:TAppDispatch) => {
        dispatch({type: PATCH_REQUEST});
        fetchWithRefreshToken(userUrl, {
                method: 'PATCH',
                mode:   'cors',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + getCookie("accessToken"),
                },
                body: JSON.stringify(profile),
            }
        ).then(result => {
            if (result && result.success) {
                dispatch({type:  PATCH_SUCCESS, name:result.user.name, email:result.user.email});
            } else {
                dispatch({type: PATCH_ERROR});
            }
        }).catch((e) => {
            dispatch({type: PATCH_ERROR});
        });
    }
};

export const userLogout: TAppThunk = () => {
    return async (dispatch:TAppDispatch) => {
        fetch(logoutUrl, {
            method: 'POST',
            mode:   'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"token": localStorage.getItem("refreshToken")}),
        }).then(checkResponse).then(result => {
            if (result && result.success) {
                localStorage.clear();
                deleteCookie('accessToken');
                dispatch({type: LOGOUT})
            }
        }).catch((e) => {
            console.log(e);
        });
    }
};