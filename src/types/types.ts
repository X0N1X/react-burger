export type TIngredient = {
	_id:           string;
	name:          string;
	type:          string;
	proteins:      number;
	fat:           number;
	carbohydrates: number;
	calories:      number;
	price:         number;
	image:         string;
	image_mobile:  string;
	image_large:   string;
	__v:           number;
	used?:         number;
};

export type TGroup = {
	text:     string;
 	name:     string;
 	children: TIngredient[];
}

export type TOrder = {
	_id:         string
	status:      'created' | 'done' | 'pending'
	ingredients: Array<string>
	name:        string
	createdAt:   string
	updatedAt:   string
	number:      number
	profile?:    boolean
}

export const enum WSActionTypes {
	WS_START   = 'WS_CONNECTION_START',
	WS_STOP    = 'WS_CONNECTION_STOP',
	WS_END     = 'WS_CONNECTION_END',
	WS_SUCCESS = 'WS_CONNECTION_SUCCESS',
	WS_ERROR   = 'WS_CONNECTION_ERROR',
	WS_CLOSED  = 'WS_CONNECTION_CLOSED',
	WS_GET     = 'WS_GET_MESSAGE',
	WS_SEND    = 'WS_SEND_MESSAGE'
}

export type TWSActionTypes = {
	WS_START:   string,
	WS_STOP:    string,
	WS_END:     string,
	WS_SUCCESS: string,
	WS_ERROR:   string,
	WS_CLOSED:  string,
	WS_GET:     string,
	WS_SEND:    string
}

export interface IWSStart {
	type:  WSActionTypes.WS_START;
	wsUrl: string;
}
export interface IWSClose {
	type: WSActionTypes.WS_END;
}
export interface IWSClosed {
	type:    WSActionTypes.WS_CLOSED;
	payload: any;
}
export interface IWSSuccess {
	type:    WSActionTypes.WS_SUCCESS;
	payload: any;
}
export interface IWSError {
	type:    WSActionTypes.WS_ERROR;
	payload: any;
}

export interface IWSGet {
	type:    WSActionTypes.WS_GET;
	payload: any;
}
export interface IWSSend {
	type:    WSActionTypes.WS_SEND;
	payload: any;
}

export type TWSActions =
	IWSStart |
	IWSClose |
	IWSSuccess |
	IWSError |
	IWSClosed |
	IWSGet |
	IWSSend;