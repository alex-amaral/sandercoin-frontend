import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Creators as TransactionPoolActions } from '../store/ducks/transactionPool';
import { Creators as MineActions } from '../store/ducks/mine';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Transaction from './Transaction';
import Button from '@material-ui/core/Button';
import history from '../utils/history';
const POLL_INTERVAL_MS = 10 * 1000;

const TransactionPool = (props) => {
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
      history.push('/blocks');
    }
  }, [success])

  const submit = () => {
    dispatch(MineActions.mineTransaction());
  }

  return (
    <Container align='center'>
      <div><Link to='/'>Home</Link></div>
      <h3>Transaction Pool</h3>
      {transactionPoolRequesting
        ? <CircularProgress />
        :<>
          {Object.values(transactionPoolMap).map(transaction => {
            return (
              <div key={transaction.id}>
                <hr />
                <Transaction transaction={transaction} />
              </div>
            )
          })}
          </>}
      <hr />
      {mineRequesting
      ? <CircularProgress />
      : <Button color='primary' onClick={submit}>
          Mine the Transactions
        </Button>}

    </Container>
  );
};

export default TransactionPool;
