import jwt_decode from "jwt-decode";

export const baseUrl      = 'https://norma.nomoreparties.space/api';
export const baseWsUrl    = 'wss://norma.nomoreparties.space';
export const ingredients  = baseUrl + '/ingredients';
export const order        = baseUrl + '/orders';
export const registration = baseUrl + '/auth/register';
export const login        = baseUrl + '/auth/login';
export const logout       = baseUrl + '/auth/logout';
export const user         = baseUrl + '/auth/user';
export const token        = baseUrl + '/auth/token';
export const forgot       = baseUrl + '/password-reset';
export const reset        = baseUrl + '/password-reset/reset';

export const checkResponse = (response: Response) => response.ok ? response.json() : Promise.reject(response.status);

export function setCookie(name: string, value: string|null, props?:{[key:string]: any}) {
	props = props || {};
	let exp = props.expires;
	if (typeof exp == 'number' && exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1000);
		exp = props.expires = d;
	}
	if (exp && exp.toUTCString) {
		props.expires = exp.toUTCString();
	}
	if (value) {
		value = encodeURIComponent(value);
	}
	let updatedCookie = name + '=' + value;
	for (const propName in props) {
		updatedCookie += '; ' + propName;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
}

export function getCookie(name: string) {
	const matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : '';
}

export function deleteCookie(name: string) {
	setCookie(name, null, { expires: -1, path: '/'});
}

const refreshToken = () => {
	return fetch (token, {
			method: 'POST',
			mode:   'cors',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({token: localStorage.getItem("refreshToken")}),
		}
	).then(checkResponse);
};

export const fetchWithRefreshToken = async (url:string, options:any) => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err) {
		//if(err.message === "jwt expired"){
			const refreshData = await refreshToken();
			if (!refreshData.success){
				Promise.reject(refreshData);
			}
			const accessToken = refreshData.accessToken.split("Bearer ")[1];
			setCookie("accessToken", accessToken, { path: '/' });
			localStorage.setItem("refreshToken", refreshData.refreshToken);
			options.headers.authorization = accessToken;
			const res = await fetch(url, options);
			return await checkResponse(res);
		//} else {
		//	return Promise.reject(err);
		//}
	}
};

export const checkAccessToken = () => {
	const accessToken = getCookie('accessToken');
	if (accessToken) {
		const decodedToken: any = jwt_decode(accessToken);
		const currentTime = new Date().getTime();
		if (decodedToken.exp * 1000 < currentTime) {
			return false;
		}
	}
	return accessToken ? true : false;
};