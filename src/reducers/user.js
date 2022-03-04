const INITIAL_STATE = { email: '' };
function user(state = INITIAL_STATE, { type, email }) {
  if (type === 'LOGIN') return { email };
  return state;
}

export default user;
