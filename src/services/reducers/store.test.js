import { store, initState } from "./store";
import { DECREASE, ERROR, INCREASE, REQUEST, SUCCESS} from "../actions/store";
import { RESET } from '../actions/constructor'
import { m_bunData, m_mainIngredientData, m_raw, m_sauceIngredientData, m_store, m_store_used } from "./mock-data";

describe('store reducer', () => {

	it('init state test', () => {
		expect(store(undefined, {type:'init'})).toEqual(initState);
	});

	it('request', () => {
		expect(store(undefined, {type:REQUEST})).toEqual({...initState, loading:true, hasError:false});
	});

	it('error', () => {
		expect(store(undefined, {type:ERROR})).toEqual({...initState, loading:false, hasError:true});
	});

	it('success', () => {
		expect(store(undefined, {type:SUCCESS, data:m_raw})).toEqual({
			...initState,
			store:    m_store,
			raw:      m_raw,
			loading:  false,
			hasError: false
		});
	});

	it('increase bun', () => {
		const action = {type:INCREASE, data: m_bunData},
			  state = {...initState, store:m_store_used};
		expect(store(state, action)).toEqual({
			...state,
			store: state.store.map((group) => {
				if (group.name === 'bun') {
					return {...group, children: group.children.map((item) => {
							return {...item, used:item._id === action.data._id ? 2 : 0}
						})
					}
				} else {
					return {...group};
				}
			})
		});
	});

	it('increase ingredient', () => {
		const action = {type:INCREASE, data: m_sauceIngredientData},
			  state = {...initState, store:m_store_used};
		expect(store(state, action)).toEqual({
			...state,
			store: state.store.map((group) => {
				return {...group, children: group.children.map((item) => {
						return {...item, used:item._id === action.data._id ? 2 : item.used}
					})
				}})
		});
	});

	it('decrease ingredient', () => {
		const action   = {type:DECREASE, data: m_mainIngredientData},
			  state = {...initState, store:m_store_used};

		expect(store(state, action)).toEqual({
			...state,
			store: m_store_used.map((group) => {
				return {...group, children: group.children.map((item) => {
						return {...item, used:item._id === action.data._id ? 2: item.used}
					})
				}})
		});
	});

	it('decrease bun', () => {
		const action   = {type:DECREASE, data: m_bunData},
			  state = {...initState, store:m_store_used};

		expect(store(state, action)).toEqual({...state});
	});

	it('reset', () => {
		const action   = {type:RESET},
			  state    = {...initState, store: m_store_used};

		expect(store(state, action)).toEqual({
			...state,
			store: state.store.map((group) => {
				return {...group, children: group.children.map((item)=>{return {...item, used:0}})}
			})
		});
	});
});