import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import QRCode from 'qrcode.react';
import { Creators as WalletActions } from '../store/ducks/wallet';
import icon from '../assets/icon.svg'
import {CircularProgress, Typography, Container, AppBar, Tabs, Tab, Box, makeStyles} from '@material-ui/core';
import TabPanel from './TabPanel';
import Blocks from './Blocks';
import ConductTransaction from './ConductTransaction';
import TransactionPool from './TransactionPool';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff'
  },
  address: {
    maxWidth: '30%'
  }
}));

const App = () => {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
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
            <AddressContainer>
              <Typography>Minha carteira</Typography>
              <br />
              <QRCode value={address || ''} size={50} />
            </AddressContainer>
            <div><Typography>Saldo: {balance} SC</Typography></div>
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

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`

export default App;
