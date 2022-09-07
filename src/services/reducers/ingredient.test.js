import { ingredient, initState } from "./ingredient";
import { CLOSE, OPEN }           from "../actions/ingredient";
import { m_sauceIngredientData }      from "./mock-data";


describe('ingredient reducer', () => {

	it('init state test', () => {
		expect(ingredient(undefined, {type:'init'})).toEqual(initState);
	});

	it('open', () => {
		expect(ingredient(undefined, {type: OPEN, data: m_sauceIngredientData})).toEqual({
			...initState,
			data:      m_sauceIngredientData,
			isVisible: true
		});
	});

	it('close', () => {
		expect(ingredient(undefined, {type:CLOSE, isOpen:false})).toEqual({
			...initState,
			data:      {},
			isVisible: false
		});
	});
});