import React, { useState, useEffect, useReducer } from 'react';
import styles from './styles.css';
import tableFields from './tablefields';
import useDataApi from './useDataApi';
// import rawData from './rawdata.js';

const initialState = {
  tableData: [],
  isError: null,
  isLoading: false,
  isFetching: false,
}

function Table(props = {}) {
  const [{ 
	tableData, isLoading, isFetching, isError
  }, dispatch] = useDataApi(
	"https://api.github.com/users/landstrider/repos",
	initialState
  );
  
  // TODO In which cases would I want to defer(lazy) initialization, and thus use the form
  // of useReducer(, , init) hook.
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
  if (isLoading) return <div>isLoading...</div>
  if (isError) return <div>Error</div>
  return (
 	<table>
	  <thead>{drawHeader()}</thead>
	  <tbody>{drawBody()}</tbody>
	</table>
  );
}

export default Table;
