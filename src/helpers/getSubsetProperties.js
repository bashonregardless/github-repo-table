function getSubsetProperties(data = {}, tableFields = []) {
  var obj = {};
  for (let key in data) {
	if (Object.prototype.hasOwnProperty.call(data, key)) {
	  if (tableFields.some(validKey => validKey === key)) {
		obj[key] = data[key];
	  }
	  if (data[key] !== null && typeof(data[key]) == 'object') {
		// DFS of the object tree
		getSubsetProperties(data[key], tableFields);
	  }
	}
  }
  return obj;
}

export default getSubsetProperties;
