import { combineReducers } from 'redux';

import wallet from './wallet';
import blocks from './blocks';
import transaction from './transaction';
import transactionPool from './transactionPool';
import mine from './mine';

export default combineReducers({
  wallet,
  blocks,
  transaction,
  transactionPool,
  mine,
});
