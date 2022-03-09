import { LOGIN } from '../actions/index';

const INITIAL_STATE = { email: '' };

function user(state = INITIAL_STATE, { type, payload }) {
  if (type === LOGIN) return { email: payload };
  return state;
}

export default user;
