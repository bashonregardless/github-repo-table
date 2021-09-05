import React, { useState, useEffect } from 'react';

function Table(props) {
  const [] = useState();

  useEffect(() => {
	async function fetchFromApi(url) {
	  const response = await fetch(url);
	  return response.json();
	}
	fetchFromApi("https://api.github.com/users/landstrider/repos")
	.then(data => {
	  console.log(data);
	})
	.catch(err => {
	  console.log("An error occured");
	  console.log(err);
	  // An UI displaying the error state is to be displayed
	});
  });

  return (
 	<table>
	  <thead></thead>
	  <tbody>
		<tr>
		  <td></td>
		</tr>
	  </tbody>
	</table>
  );
}

export default Table;
