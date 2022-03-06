export const loginEmail = (email) => ({ type: 'LOGIN', email });

export const saveItem = (payload) => ({ type: 'EXPENSES', payload });

export const removeItem = (payload) => ({ type: 'REMOVE_ITEM', payload });

export const editItem = (payload) => ({ type: 'EDIT_ITEM', payload });

export const startEditItem = (payload) => ({ type: 'START_EDIT_ITEM', payload });
