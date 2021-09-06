import rawData from '../components/table/rawdata.js';

function getSubsetProperties(data = {}, tableFields = [], obj = {}, basename = '') {
  for (let key in rawData) {
	if (Object.prototype.hasOwnProperty.call(rawData, key)) {
	  if (tableFields.some(validKey => validKey === basename + key)) {
		obj[basename + key] = rawData[key];
	  }
	  if (rawData[key] !== null && typeof(rawData[key]) == 'object') {
		// DFS of the object tree
		let bname = basename + key + '_';
		//basename =  basename + key + '_';
		// TODO What happens if above line is uncommented, and the line above that is commented out?
		// (Basics of scoping)
		// VERIFY THIS ANSWER: The basename variable will become local scoped and not block scoped.
		// Then passing basename as parameter to getSubsetProperties function will keep a single 
		// identity through out recursion.
		// TODO Is there a better way to do this?
		getSubsetProperties(rawData[key], tableFields, obj, bname);
	  }
	}
  }
  return obj;
}

export default getSubsetProperties;
