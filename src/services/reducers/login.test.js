import { login, initState } from "./login";
import { REQUEST, ERROR, SUCCESS, SET } from "../actions/login";
import { m_userData } from "./mock-data";


describe('login reducer', () => {

	it('init state test', () => {
		expect(login(undefined, {type:'init'})).toEqual(initState);
	});

	it('request', () => {
		expect(login(undefined, {type:REQUEST})).toEqual({
			...initState,
			loading:  true,
			hasError: false
		});
	});

	it('success', () => {
		expect(login(undefined, {type:SUCCESS, user:m_userData})).toEqual({
			...initState,
			loading:  false,
			hasError: false,
			auth:     true,
			name:     m_userData.name,
			email:    m_userData.email,
			form: {
				...initState.form 
			}
		});
	});

	it('error', () => {
		expect(login(undefined, {type:ERROR})).toEqual({
			...initState,
			loading:  false,
			hasError: true
		});
	});

	it('set', () => {
		const action = {type:SET, email:'email', password:'password'};
		expect(login(undefined, action)).toEqual({
			...initState,
			form: {...initState.form, [action.field]: action.value}
		});
	});
});