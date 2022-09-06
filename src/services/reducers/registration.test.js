import { registration, initState } from "./registration";
import { REQUEST, SUCCESS, SET, ERROR } from "../actions/registration";

describe('registration reducer', () => {

	it('init state test', () => {
		expect(registration(undefined, {type:'init'})).toEqual(initState);
	});

	it('request', () => {
		expect(registration(undefined, {type:REQUEST})).toEqual({
			...initState,
			loading:  true, hasError: false
		});
	});

	it('success', () => {
		expect(registration(undefined, {type:SUCCESS})).toEqual({
			...initState,
			loading:  false,
			hasError: false,
			form: {
				...initState.form
			}
		});
	});

	it('error', () => {
		expect(registration(undefined, {type:ERROR})).toEqual({
			...initState,
			loading: false, hasError: true
		});
	});

	it('set', () => {
		const action = {type:SET, email:'email', name:'name', password:'password'};
		expect(registration(undefined, action)).toEqual({
			...initState,
			form: {...initState.form, [action.field]: action.value}
		});
	});
});