import React, { useEffect, useReducer } from 'react';
import reducer, { init } from './reducer';

function useDataApi(url, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  // Fetch the data when component mounts
  useEffect(() => {
	async function fetchFromApi(url) {
	  //setIsLoading(true);
	  dispatch({ type: 'fetch_init' });
	  const response = await fetch(url);
	  return response.json();
	};

	fetchFromApi(url)
	.then(data => {
	  //console.log(data);
	  //dispatch({ type: 'success', payload: { tableData: data, error } });
	  //setIsLoading(false);
	  dispatch({ type: 'fetch_success' });
	  dispatch({ type: 'load_data', payload: {...state,  tableData: data } });
	})
	.catch(error => {
	  // TODO An UI displaying the error state is to be displayed
	  //dispatch({ type: 'error', payload: {tableData, error} });
	  //setIsLoading(false); // TODO Try refetching data
	  dispatch({ type: 'fetch_failure', payload: error });
	});
  }, []);
  // Since I don't want to re fetch the data on change of any state(tableData, and error) used inside the 
  // useEffect hook, I specify empty array as the second arg to the effect.
  // To see a case where a re fetch is performed based on some dependency provided in array arg to effect,
  // refer - https://www.robinwieruch.de/react-hooks-fetch-data.
  //
  // TODO Q. Why is it that if isFetching is specified as dependency, then data is getting fetched twice?
  // instead of getting fetched once like it should when component mounts?
  // VERIFY THIS: It is because a state (isFetching, in this case) changes when the effect first runs
  // on first mount of the component, which again triggers a re-render, after the dom is painted, the
  // effect runs again, only this time the value of "isfetching" state does not change.
  //
  // TODO Q. Why is it that when only error state is specified as a dependency in the useEffect, and when 
  // the network is disconnected, the program gets into a nasty infinite loop? Also, note that when
  // when the network is connected the problem does not occur. The program successfullly fetches data.
  // VERIFY THIS: It is because the error state is getting set(changed) by dispatch in the case when 
  // network is disconnected. This triggers a re render and an attempt to fetch the data is made again
  // which fails too, and the loop continues. TODO, here note that the new error state getting set must be
  // different( have different references to error object) from the one set in previous fetch, so that 
  // a difference in state is calculated by react, which is the reason for re render.
  // Whereas, the error state does not change in the case when network is connected.
  //
  // TODO Q. Why is it that when only tableData state is specified as dependency in useEffect, and when 
  // the network is connected, the program gets into a nasty inifinite loop? Also, note that when the 
  // network is disconnected the problem doesn't occur. The program draws the error UI to the DOM.
  // VERIFY THIS: It is because the tableData state is getting set(changed) by dispatch in the case when 
  // network is connected. This triggers a re render and an attempt to fetch the data is made again
  // which fails too, and the loop continues. TODO, here note that though the content of table data does
  // not change between fetch, then the new tableData state getting set must be
  // different( have different references to tableData object) reference from the one set in previous fetch, so that 
  // a difference in state is calculated by react, which is the reason for re render.
  // Whereas, the tableData state does not change in the case when network is connected.
  //
  // TODO Q. Why is it that when both tableData state and error state are specified as dependency in useEffect, and when 
  // the network is connected or when it is not connected, in either case the program gets into a nasty inifinite loop?
  // // VERIFY THIS: It is because the tableData state is getting set(changed) by dispatch in the case when 
  // network is disconnected. This triggers a re render and an attempt to fetch the data is made again
  // which fails too, and the loop continues. Also note that error is triggering the loop in the other case.
  // TODO, here note that though the content of table data does
  // not change between fetch, the new tableData state getting set must be
  // different( have different references to tableData object) reference from the one set in previous fetch, so that 
  // a difference in state is calculated by react, which is the reason for re render.
  // Whereas, the tableData state does not change in the case when network is connected.

  return [state]
}

export default useDataApi;
