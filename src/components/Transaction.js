import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const Transaction = ({ transaction }) => {
  const { input, outputMap } = transaction;
  const recipients = Object.keys(outputMap);

  return (
    <Container>
      {input.address !== '*authorized-reward*'
       ? <Typography>De: {`${input.address.substring(0, 20)}...`} | Saldo: {input.amount}</Typography>
       : <Typography>Recompensa</Typography>
      }
      {
        recipients.map(recipient => {
          return (
            <Typography key={recipient}>
              Para: {`${recipient.substring(0, 20)}...`} | Enviado: {outputMap[recipient]}
            </Typography>
          )
        })
      }
    </Container>
  )
}

const Container = styled.div`
  padding: 5%;
`

export default Transaction;
