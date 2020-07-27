import React, { useEffect } from 'react';
import { Creators as WalletActions } from '../../store/ducks/wallet';
import { Button, Container, TextField, FormGroup, FormLabel, Typography } from '@material-ui/core';

import { Form } from './styles';
import { useDispatch, useSelector } from 'react-redux';

export function CreateWallet() {
  const dispatch = useDispatch();

  const { wallet } = useSelector(({ wallet }) => wallet)

  function handleGeneratorWallet () {
    dispatch(WalletActions.generateWallet())
  }

  console.log('wallet ', JSON.stringify(wallet))

  return (
    <Container align="center">
      <Typography variant='h3'>Gerador de carteira</Typography>
      <Typography variant='subtitle1'>Clique no botão abaixo para gerar a sua carteira</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGeneratorWallet}
      >
        Gerar carteira
      </Button>
      <br />
      <br />
      <Form>
          <FormGroup>
            <FormLabel>Chave privada</FormLabel>
            <br />
            <TextField
            id="private-key"
            variant="filled"
            multiline
            disabled
            value={wallet && wallet.private_key} />
          </FormGroup>

          <FormGroup>
            <FormLabel>Chave pública</FormLabel>
            <br />
            <TextField
            id="public-key"
            variant="filled"
            disabled
            multiline
            value={wallet && wallet.public_key} />
           </FormGroup>
      </Form>
    </Container>
  );
}
