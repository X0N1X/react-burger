import {LOGOUT, SET, GET_REQUEST, GET_ERROR, GET_SUCCESS, PATCH_ERROR, PATCH_REQUEST, PATCH_SUCCESS} from "../actions/user";

export interface IUser {
    isAuth: boolean;
    profile: {
        name:     string;
        email:    string;
        password: string;
    };
    info: {
        name:  string;
        email: string;
    };
    getLoading:    boolean;
    getHasError:   boolean;
    patchLoading:  boolean;
    patchHasError: boolean;
}

const initState: IUser = {
    isAuth: false,
    profile: {
        name:     '',
        email:    '',
        password: '',
    },

    info: {
        name:  '',
        email: '',
    },

    getLoading:    false,
    getHasError:   false,
    patchLoading:  false,
    patchHasError: false
};

export const user = ( state = initState, action:Action) => {
    switch(action.type) {

        case SET:
            return {...state, profile: {...state.profile, [action.field]: action.value}};

        case GET_REQUEST:
            return {...state, getLoading: true,  getHasError: false};
        case GET_SUCCESS:
            return {
                ...state,
                isAuth:      true,
                getLoading:  false,
                getHasError: false,
                info:        {name: action.name, email: action.email},
                profile:     {name: action.name, email: action.email, password:''}
            };
        case GET_ERROR:
            return {...state, getLoading: false, getHasError: true};

        case PATCH_REQUEST:
            return {...state, patchLoading: true,  patchHasError: false};
        case PATCH_SUCCESS:
            return {
                ...state,
                patchLoading:  false,
                patchHasError: false,
                info:          {name: action.name, email: action.email},
                profile:       {name: action.name, email: action.email, password: ''}
            };
        case PATCH_ERROR:
            return {...state, patchLoading: false, patchHasError: true};

        case LOGOUT:
            return {...state, isAuth: false, info: {...initState.info}, profile: {...initState.profile}};

        default: {
            return state;
        }
    }
};