import { EXPENSES, REMOVE_ITEM, START_EDIT_ITEM, EDIT_ITEM,
  GET_CURRENCIES } from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [], edit: false, idEdit: 0 };
function wallet(state = INITIAL_STATE, { type, payload }) {
  if (type === GET_CURRENCIES) return { ...state, currencies: payload };
  if (type === START_EDIT_ITEM) return { ...state, edit: true, idEdit: payload };
  if (type === EXPENSES) {
    if (state.expenses.length === 0) payload.id = 0;
    else {
      const lastId = state.expenses.length - 1;
      payload.id = state.expenses[lastId].id + 1;
    }
    const newWallet = { ...state };
    newWallet.expenses = [...newWallet.expenses, payload];
    return { ...newWallet };
  }
  if (type === REMOVE_ITEM) {
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== payload)],
    };
  }
  if (type === EDIT_ITEM) {
    const newArray = state.expenses.reduce((acc, element) => {
      if (element.id === state.idEdit) return [...acc, payload];
      return [...acc, element];
    }, []);
    return { ...state, expenses: newArray, edit: false };
  }
  return state;
}

export default wallet;
