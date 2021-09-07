import getSubsetProperties from '../../helpers/getSubsetProperties.js';
import tableFields from './tablefields';

export function init(initialState = []) {
  return initialState.map((currVal) => {
	return getSubsetProperties(
	  currVal, 
	  tableFields,
	  {}, // Container object. Passing it this way maintains unique object throughout call to getSubsetProperties function.
	)
  });
}

// Signature of reducer function: (state, action) => newState
function reducer(state = {}, action = {}) {
  switch (action.type) {
	case 'updateState':
	  return init(action.payload);
	case 'error':
	  return
	default:
	  throw new Error();
  }
}

export default reducer;
