import { order, initState } from "./order";
import { REQUEST, ERROR, SUCCESS } from "../actions/order";

describe('order reducer', () => {

	it('init state test', () => {
		expect(order(undefined, {type:'init'})).toEqual(initState);
	});

	it('request', () => {
		expect(order(undefined, {type:REQUEST})).toEqual({
			...initState,
			loading:  true,
			hasError: false
		});
	});

	it('success', () => {
		expect(order(undefined, {type:SUCCESS, number:1})).toEqual({
			...initState,
			loading:  false,
			hasError: false,
			number:   1
		});
	});

	it('error', () => {
		expect(order(undefined, {type:ERROR})).toEqual({
			...initState,
			loading:  false,
			hasError: true
		});
	});
});