import React, { useReducer } from 'react';

function useDataApi() {
  const [{ tableData = [], error }, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
	async function fetchFromApi(url) {
	  setIsLoading(true);
	  const response = await fetch(url);
	  return response.json();
	};

	fetchFromApi("https://api.github.com/users/landstrider/repos")
	.then(data => {
	  //console.log(data);
	  dispatch({ type: 'success', payload: { tableData: data, error } });
	  setIsLoading(false);
	})
	.catch(error => {
	  // TODO An UI displaying the error state is to be displayed
	  dispatch({ type: 'error', payload: {tableData, error} });
	  setIsLoading(false); // TODO Try refetching data
	});
  }, []);

  return [data, setTableState]
}
