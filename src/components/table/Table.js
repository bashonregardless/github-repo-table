import React, { useState, useEffect } from 'react';

function Table(props) {
  const [fetchStatus, fetchData] = useState(true);

  useEffect(() => {
	async function fetchFromApi(url) {
	  const response = await fetch(url);
	  return response.json();
	};

	fetchFromApi("https://api.github.com/users/landstrider/repos")
	.then(data => {
	  console.log(data);
	  fetchData(false);
	})
	.catch(err => {
	  console.log("An error occured");
	  console.log(err);
	  // An UI displaying the error state is to be displayed
	});
  }, [fetchStatus]); // Q. Why is it that if fetchStatus is specified as dependency, then data is getting fetched twice?

  if (fetchStatus) return <div>Fetching...</div>;
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
