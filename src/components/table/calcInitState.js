import getSubsetProperties from '../../helpers/getSubsetProperties.js';
import tableFields from './tablefields';

function init(initalState) {
  return getSubsetProperties(initalState, tableFields);
}

export default init;
