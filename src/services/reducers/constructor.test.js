import { m_bunData, m_mainIngredientData, m_sauceIngredientData } from "./mock-data";
import { ADD, DELETE, ORDER, RESET } from "../actions/constructor";
import { v4 } from 'uuid';
import { burger, initState } from "./constuctor";

describe('constructor reducer', () => {

	it('init state test', () => {
		expect(burger(undefined, {type:'init'})).toEqual(initState);
	});

	it('add bun', () => {
		expect(burger(undefined, {type:ADD, data:m_bunData})).toEqual({
			...initState,
			currentBurger:{
				...initState.currentBurger, bun: m_bunData
			}
		})
	});
	const id = v4();
	it('add sauce', () => {
		expect(burger(undefined, {type:ADD, data:m_sauceIngredientData, uuid:id})).toEqual({
			...initState,
			currentBurger:{
				...initState.currentBurger,
				ingredients: [
					...initState.currentBurger.ingredients, {
						...m_sauceIngredientData,
						uuid: id
					}
				]
			}
		})
	});

	it('delete', () => {
		expect(burger({
			...initState,
			currentBurger:{
				...initState.currentBurger,
				ingredients: [
					...initState.currentBurger.ingredients, {
						...m_sauceIngredientData,
						uuid: id
					}
				]
			}
		}, {type:DELETE, data:0})).toEqual(initState);
	});
	const id1 = v4();
	it('move 0->1', () => {
		expect(burger({
			...initState,
			currentBurger:{
				...initState.currentBurger,
				ingredients: [
					...initState.currentBurger.ingredients, {
						...m_sauceIngredientData,
						uuid: id
					},{
						...m_mainIngredientData,
						uuid: id1
					}
				]
			}
		}, {type:ORDER, data:{from:0, to:1}})).toEqual({
			...initState,
			currentBurger:{
				...initState.currentBurger,
				ingredients: [
					...initState.currentBurger.ingredients, {
						...m_mainIngredientData,
						uuid: id1
					},{
						...m_sauceIngredientData,
						uuid: id
					}
				]
			}
		});
	});

	it('reset', () => {
		expect(burger({
			...initState,
			currentBurger:{
				...initState.currentBurger,
				bun: m_bunData,
				ingredients: [
					...initState.currentBurger.ingredients, {
						...m_sauceIngredientData,
						uuid: id
					}
				]
			}
		}, {type:RESET, data:0})).toEqual(initState);
	});
});