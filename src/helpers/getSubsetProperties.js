function getSubsetProperties(data = {}, tableFields = [], obj = {}, basename = '') {
  for (let key in data) {
	if (Object.prototype.hasOwnProperty.call(data, key)) {
	  if (tableFields.some(validKey => validKey === basename + key)) {
		obj[basename + key] = data[key];
	  }
	  if (data[key] !== null && typeof(data[key]) == 'object') {
		// DFS of the object tree
		let bname = basename + key + '_';
		//basename =  basename + key + '_';
		// TODO What happens if above line is uncommented, and the line above that is commented out?
		// (Basics of scoping)
		// VERIFY THIS ANSWER: The basename variable will become local scoped and not block scoped.
		// Then passing basename as parameter to getSubsetProperties function will keep a single 
		// identity through out recursion.
		// TODO Is there a better way to do this?
		getSubsetProperties(data[key], tableFields, obj, bname);
	  }
	}
  }
  return obj;
}

export default getSubsetProperties;
