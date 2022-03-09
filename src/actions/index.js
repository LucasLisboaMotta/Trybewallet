const URL = 'https://economia.awesomeapi.com.br/json/all';

export const LOGIN = 'LOGIN';
export const EXPENSES = 'EXPENSES';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const START_EDIT_ITEM = 'START_EDIT_ITEM';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const loginEmail = (email) => ({ type: LOGIN, payload: email });
export const editItem = (expense) => ({ type: EDIT_ITEM, payload: expense });
export const startEditItem = (id) => ({ type: START_EDIT_ITEM, payload: id });
export const removeItem = (id) => ({ type: REMOVE_ITEM, payload: id });

export const saveItem = (expense) => (async (dispatch) => {
  const getApi = await fetch(URL);
  const exchangeRates = await getApi.json();
  expense.exchangeRates = exchangeRates;
  dispatch({ type: EXPENSES, payload: expense });
});

export const getCurrencies = () => (async (dispatch) => {
  const getApi = await fetch(URL);
  const resolve = await getApi.json();
  const currencies = Object.keys(resolve).filter((current) => current !== 'USDT');
  dispatch({ type: GET_CURRENCIES, payload: currencies });
});
