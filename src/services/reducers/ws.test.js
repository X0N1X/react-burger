import { ws, initialState as initState } from "./ws";
import { WSActionTypes} from "../../types/types";
import { m_orders } from "./mock-data";


describe('ws reducer', () => {

	it('init state test', () => {
	 	// noinspection JSCheckFunctionSignatures
		expect(ws(undefined, {type:'init'})).toEqual(initState);
	});

	it('success', () => {
		expect(ws(undefined, {type:WSActionTypes.WS_SUCCESS, payload:''})).toEqual({...initState ,wsConnected: true});
	});

	it('error', () => {
		expect(ws(undefined, {type:WSActionTypes.WS_ERROR, payload:''})).toEqual({...initState, wsConnected: false});
	});

	it('clossed', () => {
		expect(ws(undefined, {type:WSActionTypes.WS_CLOSED, payload:''})).toEqual({...initState, wsConnected: false});
	});

	it('end', () => {
		expect(ws(undefined, {type:WSActionTypes.WS_END, payload:''})).toEqual({...initState});
	});

	it('get', () => {
		expect(ws(undefined, {type:WSActionTypes.WS_GET, payload:m_orders})).toEqual({
			...initState,
			orders:     m_orders.orders,
			total:      m_orders.total,
			totalToday: m_orders.totalToday
		});
	});
});