import { password, initState } from "./password";
import { FORGOT_REQUEST, FORGOT_SUCCESS, FORGOT_SET, FORGOT_ERROR,
	RESET_ERROR, RESET_REQUEST, RESET_SUCCESS, RESET_SET} from "../actions/password";

describe('password reducer', () => {

	it('init state test', () => {
		expect(password(undefined, {type:'init'})).toEqual(initState);
	});

	it('forgot_request', () => {
		expect(password(undefined, {type:FORGOT_REQUEST})).toEqual({
			...initState,
			forgotLoading: true, forgotHasError: false, forgotSuccess: false
		});
	});

	it('forgot_success', () => {
		expect(password(undefined, {type:FORGOT_SUCCESS, number:1})).toEqual({
			...initState,
			forgotLoading:  false,
			forgotHasError: false,
			forgotSuccess:  true,
			forgotForm: {email: ''}
		});
	});

	it('forgot_error', () => {
		expect(password(undefined, {type:FORGOT_ERROR})).toEqual({
			...initState,
			forgotLoading: false, forgotHasError: true, forgotSuccess: false
		});
	});

	it('forgot_set', () => {
		const action = {type:FORGOT_SET, email:'email'};
		expect(password(undefined, action)).toEqual({
			...initState,
			forgotForm: {...initState.forgotForm, [action.field]: action.value}
		});
	});

	it('reset_request', () => {
		expect(password(undefined, {type:RESET_REQUEST})).toEqual({
			...initState,
			resetLoading: true, resetHasError: false, resetSuccess: false
		});
	});

	it('reset_success', () => {
		expect(password(undefined, {type:RESET_SUCCESS, number:1})).toEqual({
			...initState,
			resetLoading:  false,
			resetHasError: false,
			resetSuccess:  true,
			resetForm: {token: '', password: ''}
		});
	});

	it('reset_error', () => {
		expect(password(undefined, {type:RESET_ERROR})).toEqual({
			...initState,
			resetLoading: false, resetHasError: true, resetSuccess: false
		});
	});

	it('reset_set', () => {
		const action = {type:RESET_SET, password:'password', token:'token'};
		expect(password(undefined, action)).toEqual({
			...initState,
			resetForm: {...initState.resetForm, [action.field]: action.value}
		});
	});


});