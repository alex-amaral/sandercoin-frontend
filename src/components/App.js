import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { Creators as WalletActions } from '../store/ducks/wallet';
import icon from '../assets/icon.svg'
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(WalletActions.getWalletInfo())
  }, [dispatch]);

  const { requesting, walletInfo, error } = useSelector(({ wallet }) => ({ ...wallet }));

  const { address, balance } = walletInfo || {};

  return (
    <Container align='center'>
      <div>
        <Logo src={icon} alt='icon'/>
      </div>
      <br/>
      <div>Welcome to the blockchain...</div>
      <br/>
      <div><Link to='/blocks'>Blocks</Link></div>
      <div><Link to='/conduct-transaction'>Conduct a Transaction</Link></div>
      <div><Link to='/transaction-pool'>Transaction Pool</Link></div>
      <br/>
      {requesting
        ? <CircularProgress />
        : <div>
          <div><span>Address: {address}</span></div>
          <div><span>Balance: ${balance}</span></div>
        </div>
      }
      <br/>
    </Container>
  );
};

const Logo = styled.img`
  height: 250px;
  width: 250px;
`

export default App;
