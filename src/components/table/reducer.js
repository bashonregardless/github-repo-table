import getSubsetProperties from '../../helpers/getSubsetProperties.js';
import tableFields from './tablefields';

// NOTE assert that initialState argument matces the type passed to it.
export function init(initialState = {}) {
  const { tableData = [] } = initialState;
  const subsetTableData = tableData.map((currVal) => {
	return getSubsetProperties(
	  currVal, 
	  tableFields,
	  {}, // Container object. Passing it this way maintains unique object throughout call to getSubsetProperties function.
	)
  });
  
  return {
	...initialState,
	tableData: subsetTableData,
  }
}

// Signature of reducer function: (state, action) => newState
function reducer(state = {}, action = {}) {
  const { payload = {} } = action;
  switch (action.type) {
	case 'success':
	  return init(payload);
	case 'error':
	  return {
		...state,
		error: payload.error
	  }
	default:
	  throw new Error();
  }
}

export default reducer;
