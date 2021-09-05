function findMatchingKey(acc, key, tableFields) {
  Object.keys(key).forEach(function (key) {
	if (tableFields.any(validKey => validKey === key)) {
	  acc[key] = '';
	  return;
	}
	findMatchingKey(acc, key);
  });
};

function getSubsetProperties(data, tableFields) {
  return Object.keys(data).reduce((acc, currVal) => findMatchingKey(acc, currVal, tableFields), {});
}

export default getSubsetProperties;
