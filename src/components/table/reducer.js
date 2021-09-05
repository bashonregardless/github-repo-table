import init from './calcInitState';

// Signature of reducer function: (state, action) => newState
function reducer(state, action) {
  switch (action.type) {
	case 'updateState':
	  return init(action.payload);
	default:
	  throw new Error();
  }
}

export default reducer;
