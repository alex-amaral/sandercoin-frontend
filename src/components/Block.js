import React, {useState} from 'react';
import styled from 'styled-components';
import Transaction from './Transaction';
import { Button, Typography } from '@material-ui/core';

const Block = ({ timestamp, hash, data }) => {
  const getDataDisplay = () => {
    return (
      <div>
        {
          data.map(transaction => (
            <div key={transaction.id}>
              <hr />
              <Transaction transaction={transaction} />
            </div>
          ))
        }
        <br/>
      </div>
    )
  }

  return (
    <Container>
      <Typography>Hash: {hash}</Typography>
      <Typography>Data: {new Date(timestamp).toLocaleString()}</Typography>
      <div>
        {getDataDisplay()}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export default Block;
