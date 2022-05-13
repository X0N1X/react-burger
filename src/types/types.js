import { shape, number, string, arrayOf } from 'prop-types';

/**
 * Определение типа данных "ингредиент"
 * @type {Requireable<InferProps<{
 * 		image: Validator<NonNullable<string>>,
 * 		price: Validator<NonNullable<number>>,
 * 		name: Validator<NonNullable<string>>,
 * 		_id: Validator<NonNullable<string>>}
 * 	>>}
 */
export const ingredient = shape({
	name:  string.isRequired,
	price: number.isRequired,
	image: string.isRequired,
	used:  number.isRequired,
	_id:   string.isRequired
});

/**
 * Определение типа данных "бургер"
 * @type {Requireable<InferProps<{
 * 		total: Validator<NonNullable<number>>,
 * 		ingredients: Validator<NonNullable<any[]>>,
 * 		bun: Validator<NonNullable<T>>}
 * 	>>}
 */
export const burger = shape({
	bun:         ingredient.isRequired,
	ingredients: arrayOf(ingredient).isRequired
});

/**
 * Определение типа данных "категория ингредиентов"
 * @type {Requireable<InferProps<{
 * 		children: Requireable<InferProps<{
 * 			image: Validator<NonNullable<string>>,
 * 			price: Validator<NonNullable<number>>,
 * 			name: Validator<NonNullable<string>>,
 * 			_id: Validator<NonNullable<string>>
 * 		}>>,
 * 		text: Validator<NonNullable<T>>}
 * 	>>}
 */
export const group = shape({
	text:     string.isRequired,
	name:     string.isRequired,
	children: arrayOf(ingredient).isRequired
});