const INITIAL_STATE = { currencies: [], expenses: [] };
function wallet(state = INITIAL_STATE, { type, payload }) {
  if (type === 'EXPENSES') {
    payload.id = state.expenses.length;
    const newWallet = { ...state };
    newWallet.expenses = [...newWallet.expenses, payload];
    return { ...newWallet };
  }
  return state;
}

export default wallet;
