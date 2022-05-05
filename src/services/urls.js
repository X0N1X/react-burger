export const baseUrl     = 'https://norma.nomoreparties.space/api';
export const ingredients = baseUrl + '/ingredients';
export const order       = baseUrl + '/orders';

export const checkResponse = response => response.ok ? response.json() : Promise.reject(response.status);