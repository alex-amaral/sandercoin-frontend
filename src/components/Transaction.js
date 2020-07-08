import React from 'react';
import styled from 'styled-components';

const Transaction = ({ transaction }) => {
  const { input, outputMap } = transaction;
  const recipients = Object.keys(outputMap);

  return (
    <Container>
      <div>De: {`${input.address.substring(0, 20)}...`} | Saldo: {input.amount}</div>
      {
        recipients.map(recipient => {
          return (
            <div key={recipient}>
              Para: {`${recipient.substring(0, 20)}...`} | Enviado: {outputMap[recipient]}
            </div>
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
