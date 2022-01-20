export function counterReducer(state = { count: 0 }, { type }) {
  switch (type) {
    case 'INCREMENT':
      console.log('inside reducer');
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
