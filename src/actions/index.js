export const LOGIN = 'LOGIN';
export const EXPENSES = 'EXPENSES';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const START_EDIT_ITEM = 'START_EDIT_ITEM';

export const loginEmail = (email) => ({ type: LOGIN, payload: email });
export const saveItem = (payload) => ({ type: EXPENSES, payload });
export const removeItem = (payload) => ({ type: REMOVE_ITEM, payload });
export const editItem = (payload) => ({ type: EDIT_ITEM, payload });
export const startEditItem = (payload) => ({ type: START_EDIT_ITEM, payload });
