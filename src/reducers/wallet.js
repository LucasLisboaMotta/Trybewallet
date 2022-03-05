const INITIAL_STATE = { currencies: [], expenses: [] };
function wallet(state = INITIAL_STATE, { type, payload }) {
  if (type === 'EXPENSES') {
    if (state.expenses.length === 0) {
      payload.id = 0;
    } else {
      const lastId = state.expenses.length - 1;
      payload.id = state.expenses[lastId].id + 1;
    }
    const newWallet = { ...state };
    newWallet.expenses = [...newWallet.expenses, payload];
    return { ...newWallet };
  }
  if (type === 'REMOVE_ITEM') {
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== payload)],
    };
  }
  return state;
}

export default wallet;
