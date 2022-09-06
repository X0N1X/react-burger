import { state, initState } from "./state";
import { CHANGE_GROUP, CHANGE_TAB } from "../actions/state";

describe('state reducer', () => {

	it('init state test', () => {
		expect(state(undefined, {type:'init'})).toEqual(initState);
	});

	it('CHANGE_GROUP', () => {
		expect(state(undefined, {type:CHANGE_GROUP, data:'group1'})).toEqual({
			...initState,
			group:'group1'
		});
	});

	it('CHANGE_TAB', () => {
		expect(state(undefined, {type:CHANGE_TAB, data:'tab1'})).toEqual({
			...initState,
			tab:'tab1'
		});
	});
});