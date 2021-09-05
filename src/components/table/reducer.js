import getSubsetProperties from '../../helpers/getSubsetProperties.js';
import tableFields from './tablefields';

export function init(initialState = []) {
  return initialState.map((currVal) => getSubsetProperties(currVal, tableFields));
}

// Signature of reducer function: (state, action) => newState
function reducer(state = {}, action = {}) {
  switch (action.type) {
	case 'updateState':
	  return init(action.payload);
	default:
	  throw new Error();
  }
}

export default reducer;
