import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Creators as TransactionPoolActions } from '../store/ducks/transactionPool';
import { Creators as MineActions } from '../store/ducks/mine';
import CircularProgress from '@material-ui/core/CircularProgress';
import Transaction from './Transaction';
import Button from '@material-ui/core/Button';
const POLL_INTERVAL_MS = 10 * 1000;

const TransactionPool = ({ onMineTransactions }) => {
  const dispatch = useDispatch();
  const { requesting: transactionPoolRequesting, transactionPoolMap, error } = useSelector(({ transactionPool }) => transactionPool)
  const { requesting: mineRequesting, success } = useSelector(({ mine }) => mine)
  let fetchPoolMapInterval;

  useEffect(() => {
    fetchPoolMapInterval = setInterval(() => dispatch(TransactionPoolActions.getTransactionPoolMap()), POLL_INTERVAL_MS);
  }, [dispatch])

  useEffect(() => {
    return () => {
      clearInterval(fetchPoolMapInterval)
    }
  }, [fetchPoolMapInterval])

  useEffect(() => {
    if (success) {
      onMineTransactions();
    }
  }, [success])

  const submit = () => {
    dispatch(MineActions.mineTransaction());
  }

  return (
    <>
      <>
        {Object.values(transactionPoolMap).map(transaction => {
          return (
            <div key={transaction.id}>
              <hr />
              <Transaction transaction={transaction} />
            </div>
          )
        })}
      </>
      <hr />
      {mineRequesting || transactionPoolRequesting
      ? <CircularProgress />
      : <Button color='primary' onClick={submit}>
          Minerar
        </Button>}
    </>
  );
};

export default TransactionPool;
