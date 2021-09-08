import React, { useState, useEffect, useReducer } from 'react';
import reducer, { init } from './reducer';
import styles from './styles.css';
import tableFields from './tablefields';
import rawData from './rawdata.js';

const initialState = {
  tableData: [],
  error: null,
}

function Table(props = {}) {
  const [isFetching, fetchData] = useState(true);
  const [{ tableData = [], error }, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
	async function fetchFromApi(url) {
	  const response = await fetch(url);
	  return response.json();
	};

	fetchFromApi("https://api.github.com/users/landstrider/repos")
	.then(data => {
	  //console.log(data);
	  dispatch({ type: 'success', payload: { tableData: data, error } });
	  fetchData(false);
	})
	.catch(error => {
	  // TODO An UI displaying the error state is to be displayed
	  dispatch({ type: 'error', payload: {tableData, error} });
	  fetchData(false); // TODO Try refetching data
	});
  }, [tableData, error]);
  // TODO Q. Why is it that if isFetching is specified as dependency, then data is getting fetched twice?
  // instead of getting fetched once like it should when component mounts?
  // VERIFY THIS: It is because a state (isFetching, in this case) changes when the effect first runs
  // on first mount of the component, which again triggers a re-render, after the dom is painted, the
  // effect runs again, only this time the value of "isfetching" state does not change.
  //
  // TODO Q. Why is it that when only error state is specified as a dependency in the useEffect, and when 
  // the network is disconnected, the program gets into a nasty infinite loop? Also, note that when
  // when the network is connected the problem does not occur. The program successfullly fetches data.
  // VERIFY THIS: It is because the error action is getting set(changed) by dispatch in the case when 
  // network is disconnected. This triggers a re render and an attempt to fetch the data is made again
  // which fails too, and the loop continues. TODO, here note that the new error state getting set must be
  // different( have different references to error object) from the one set in previous fetch, so that 
  // a difference in state is calculated by react, which is the reason for re render.
  // Whereas, the error state does not change in the case when network is connected.
  //
  // TODO Q. Why is it that when only tableData state is specified as dependency in useEffect, and when 
  // the network is connected, the program gets into a nasty inifinite loop? Also, note that when the 
  // network is disconnected the problem doesn't occur. The program draws the error UI to the DOM.
  // VERIFY THIS: It is because the tableData action is getting set(changed) by dispatch in the case when 
  // network is disconnected. This triggers a re render and an attempt to fetch the data is made again
  // which fails too, and the loop continues. TODO, here note that the new tableData state getting set must be
  // different( have different references to tableData object) from the one set in previous fetch, so that 
  // a difference in state is calculated by react, which is the reason for re render.
  // Whereas, the tableData state does not change in the case when network is connected.
  
  function drawHeader() {
	 return ( 
	   <tr>{
	      tableFields.map((header) => (
	        <th key={header}>{header}</th>
	      ))
	   }
	   </tr>
	 )
  }

  function drawBody() {
	return tableData.map((body = {}) => (
	  <tr key={body.id}>{
		tableFields.map((field, idx) => (
		  <td key={idx}>{body[field]}</td>
		))
	  }
	  </tr>
	));
  }

  if (isFetching) return <div>Fetching...</div>;
  if (error) return <div>Error</div>
  return (
 	<table>
	  <thead>{drawHeader()}</thead>
	  <tbody>{drawBody()}</tbody>
	</table>
  );
}

export default Table;
