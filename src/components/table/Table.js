import React, { useState, useEffect, useReducer } from 'react';
import reducer, { init } from './reducer';
import styles from './styles.css';
import tableFields from './tablefields';

function Table(props = {}) {
  const [isFetching, fetchData] = useState(true);
  const [tableState, dispatchUpdateState] = useReducer(reducer, [], init);

  useEffect(() => {
	async function fetchFromApi(url) {
	  const response = await fetch(url);
	  return response.json();
	};

	fetchFromApi("https://api.github.com/users/landstrider/repos")
	.then(data => {
	  console.log(data);
	  dispatchUpdateState({ type: 'updateState', payload: data });
	  fetchData(false);
	})
	.catch(err => {
	  // TODO An UI displaying the error state is to be displayed
	  console.log("An error occured");
	  console.log(err);
	  fetchData(true); // TODO Try refetching data
	});
  }, []);
  // Q. Why is it that if isFetching is specified as dependency, then data is getting fetched twice?
  // instead of getting fetched once like it should when component mounts?
  // VERIFY THIS: It is because a state (isFetching, in this case) changes when the effect first runs
  // on first mount of the component, which again triggers a re-render, after the dom is painted, the
  // effect runs again, only this time the value of "isfetching" state does not change.
  //
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
	return tableState.map((body = {}) => (
	  <tr key={body.id}>{
		tableFields.map((field, idx) => (
		  <td key={idx}>{body[field]}</td>
		))
	  }
	  </tr>
	));
  }

  if (isFetching) return <div>Fetching...</div>;
  return (
 	<table>
	  <thead>{drawHeader()}</thead>
	  <tbody>{drawBody()}</tbody>
	</table>
  );
}

export default Table;
