export const loginEmail = (email) => ({ type: 'LOGIN', email });

export const expenses = (payload) => ({ type: 'EXPENSES', payload });

export const removeItem = (payload) => ({ type: 'REMOVE_ITEM', payload });
