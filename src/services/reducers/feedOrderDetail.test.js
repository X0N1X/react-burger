import { feedOrderDetail, initState } from "./feedOrderDetail";
import { CLOSE, ERROR, OPEN, REQUEST, SUCCESS } from "../actions/feedOrderDetail";


describe('feedOrderDetails reducer', () => {

	it('init state test', () => {
		expect(feedOrderDetail(undefined, {type:'init'})).toEqual(initState);
	});

	it('request', () => {
		expect(feedOrderDetail(undefined, {type:REQUEST})).toEqual({
			...initState,
			orderRequest:true
		});
	});

	it('success', () => {
		expect(feedOrderDetail(undefined, {type:SUCCESS, order:1})).toEqual({
			...initState,
			orderFailed:  false,
			order:        1,
			orderRequest: false
		});
	});

	it('error', () => {
		expect(feedOrderDetail(undefined, {type:ERROR})).toEqual({
			...initState,
			orderRequest:false
		});
	});

	it('open', () => {
		expect(feedOrderDetail(undefined, {type:OPEN, order:1, isOpen:true})).toEqual({
			...initState,
			order:  1,
			isOpen: true
		});
	});

	it('close', () => {
		expect(feedOrderDetail(undefined, {type:CLOSE, isOpen:false})).toEqual({
			...initState,
			isOpen: false
		});
	});
});