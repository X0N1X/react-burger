import { user, initState } from "./user";
import {
	GET_ERROR,
	GET_REQUEST,
	GET_SUCCESS,
	PATCH_REQUEST,
	SET,
	PATCH_ERROR,
	PATCH_SUCCESS,
	LOGOUT
} from "../actions/user";

describe('user reducer', () => {

	it('init state test', () => {
		expect(user(undefined, {type:'init'})).toEqual(initState);
	});

	it('request', () => {
		expect(user(undefined, {type:GET_REQUEST})).toEqual({...initState, getLoading:true, getHasError:false});
	});

	it('error', () => {
		expect(user(undefined, {type:GET_ERROR})).toEqual({...initState, getLoading:false, getHasError:true});
	});

	it('set', () => {
		const action = {
			type:     SET,
			name:     'name',
			email:    'email',
			password: 'password',
		};
		expect(user(undefined, action)).toEqual({
			...initState,
			profile: {...initState.profile, [action.field]: action.value}
		});
	});

	it('success', () => {
		expect(user(undefined, {type:GET_SUCCESS, name: 'name', email: 'email'})).toEqual({
			...initState,
			isAuth:      true,
			getLoading:  false,
			getHasError: false,
			info:        {name: 'name', email: 'email'},
			profile:     {name: 'name', email: 'email', password:''}
		});
	});

	it('patch request', () => {
		expect(user(undefined, {type:PATCH_REQUEST})).toEqual({...initState, patchLoading:true, patchHasError:false});
	});

	it('patch error', () => {
		expect(user(undefined, {type:PATCH_ERROR})).toEqual({...initState, patchLoading:false, patchHasError:true});
	});

	it('patch success', () => {
		expect(user(undefined, {type:PATCH_SUCCESS, name: 'name', email: 'email'})).toEqual({
			...initState,
			patchLoading:  false,
			patchHasError: false,
			info:        {name: 'name', email: 'email'},
			profile:     {name: 'name', email: 'email', password:''}
		});
	});

	it('logout', () => {
		expect(user(undefined, {type:LOGOUT})).toEqual({
			...initState,
			isAuth: false,
			info: {...initState.info}, profile: {...initState.profile}
		});
	});
});