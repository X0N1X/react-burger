import { setCookie, getCookie, deleteCookie, checkResponse, logout as logoutUrl, user as userUrl, token as tokenUrl} from "../urls";

export const GET_REQUEST = "USER_GET_REQUEST";
export const GET_SUCCESS = "USER_GET_SUCCESS";
export const GET_ERROR   = "USER_GET_ERROR";
export const SET         = 'USER_SET';

export const PATCH_REQUEST = "USER_PATCH_REQUEST";
export const PATCH_SUCCESS = "USER_PATCH_SUCCESS";
export const PATCH_ERROR   = "USER_PATCH_ERROR";

export const LOGOUT = "USER_LOGOUT";

export const setUser = (field, value) => ({type: SET, field, value});

const refreshToken = () => {
    return fetch (tokenUrl, {
            method: 'POST',
            mode:   'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: localStorage.getItem("refreshToken")}),
        }
    ).then(checkResponse);
};

const fetchWithRefreshToken = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const data = await refreshToken();
            if (!data.success) {
                return Promise.reject(data);
            }
            setCookie("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            options.headers.authorization = data.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getUser = () => {
    return async (dispatch) => {
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

export const patchUser = () => {
    return async (dispatch, getState) => {
        dispatch({type: PATCH_REQUEST});
        fetchWithRefreshToken(userUrl, {
                method: 'PATCH',
                mode:   'cors',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + getCookie("accessToken"),
                },
                body: JSON.stringify(getState().user.profile),
            }
        ).then(result => {
            if (result && result.success) {
                dispatch({type: PATCH_SUCCESS});
                dispatch(getUser());
            } else {
                dispatch({type: PATCH_ERROR});
            }
        }).catch((e) => {
            dispatch({type: PATCH_ERROR});
        });
    }
};

export const userLogout = () => {
    return async (dispatch) => {
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