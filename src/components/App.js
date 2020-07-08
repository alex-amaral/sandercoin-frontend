import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { Creators as WalletActions } from '../store/ducks/wallet';
import icon from '../assets/icon.svg'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TabPanel from './TabPanel';
import Blocks from './Blocks';
import ConductTransaction from './ConductTransaction';
import TransactionPool from './TransactionPool';

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(WalletActions.getWalletInfo())
  }, [dispatch]);

  const { requesting, walletInfo, error } = useSelector(({ wallet }) => ({ ...wallet }));

  const { address, balance } = walletInfo || {};

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const addressDisplay = address ? `${address.substring(0, 15)}...` : address;

  return (
    <div>
      <AppBar position='static'>
        <Tabs
          variant='fullWidth'
          value={selectedTab}
          onChange={handleTabChange}>
          <Tab
            label='Blocos'
            href='/blocks'
            component='a'
            onClick={(event) => { event.preventDefault() }} />
          <Tab
            label='Efetuar uma transação'
            href='/conduct-transaction'
            component='a'
            onClick={(event) => { event.preventDefault() }} />
          <Tab
            label='Pool de Transações'
            href='/transaction-pool'
            component='a'
            onClick={(event) => { event.preventDefault() }} />
        </Tabs>
      </AppBar>
      <Container align='center'>
        {requesting
          ? <CircularProgress />
          : <Box p={3}>
            <div><span>Carteira: {addressDisplay}</span></div>
            <div><span>Saldo: ${balance}</span></div>
          </Box>
        }
      </Container>
      <TabPanel value={selectedTab} index={0}>
        <Blocks />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <ConductTransaction onSubmit={() => setSelectedTab(0)} />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <TransactionPool onMineTransactions={() => setSelectedTab(0)} />
      </TabPanel>
      <br/>
      <br/>
    </div>
  );
};

const Logo = styled.img`
  height: 250px;
  width: 250px;
`

export default App;
