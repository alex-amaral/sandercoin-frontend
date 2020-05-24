import React from 'react';
import styled from 'styled-components';

const Transaction = ({ transaction }) => {
  const { input, outputMap } = transaction;
  const recipients = Object.keys(outputMap);

  return (
    <Container>
      <div>From: {`${input.address.substring(0, 20)}...`} | Balance: {input.amount}</div>
      {
        recipients.map(recipient => {
          return (
            <div key={recipient}>
              To: {`${recipient.substring(0, 20)}...`} | Sent: {outputMap[recipient]}
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
