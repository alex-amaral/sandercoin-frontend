import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { FormGroup, Input, Button } from '@material-ui/core';
import { Creators as TransactionActions } from '../store/ducks/transaction';
import CircularProgress from '@material-ui/core/CircularProgress';

const ConductTransaction = ({ onSubmit }) => {
  const [recipient, setRecipient] = useInputText('');
  const [amount, setAmount] = useInputNumber();
  const dispatch = useDispatch();
  const { requesting } = useSelector(({ transaction }) => transaction)

  const submit = async event => {
    event.preventDefault()
    dispatch(TransactionActions.createTransaction({ recipient, amount }))
    onSubmit()
  }

  return (
    <Form>
      <FormGroup>
        <Input
          placeholder='Recipient'
          value={recipient}
          onChange={setRecipient}
          fullWidth
        />
      </FormGroup>
      <br/>
      <FormGroup>
        <Input
          placeholder='Amount'
          type='number'
          onChange={setAmount}
          fullWidth
        />
      </FormGroup>
      <br/>
      <div>
        {requesting
        ? <CircularProgress />
        :<Button
            color='primary'
            onClick={submit}>
            Submit
          </Button>}
      </div>
    </Form>
  );
};

const Form = styled.form`
  margin: 10%;
`

const useInputText = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleSetValue = event => {
    setValue(event.target.value)
  }

  return [value, handleSetValue];
}

const useInputNumber = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleSetValue = event => {
    setValue(Number(event.target.value))
  }

  return [value, handleSetValue];
}

export default ConductTransaction;
