const URL = 'https://economia.awesomeapi.com.br/json/all';

export const LOGIN = 'LOGIN';
export const EXPENSES = 'EXPENSES';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const START_EDIT_ITEM = 'START_EDIT_ITEM';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const loginEmail = (email) => ({ type: LOGIN, payload: email });
export const saveItem = (payload) => ({ type: EXPENSES, payload });
export const removeItem = (payload) => ({ type: REMOVE_ITEM, payload });
export const editItem = (payload) => ({ type: EDIT_ITEM, payload });
export const startEditItem = (payload) => ({ type: START_EDIT_ITEM, payload });
export const getCurrencies = () => (async (dispatch) => {
  const getApi = await fetch(URL);
  const resolve = await getApi.json();
  const currencies = Object.keys(resolve).filter((current) => current !== 'USDT');
  dispatch({ type: GET_CURRENCIES, payload: currencies });
});
