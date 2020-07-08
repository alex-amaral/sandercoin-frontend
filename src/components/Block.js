import React, {useState} from 'react';
import styled from 'styled-components';
import Transaction from './Transaction';
import Button from '@material-ui/core/Button';

const Block = ({ timestamp, hash, data }) => {
  const [displayTransaction, toggleDisplayTransaction] = useDisplayTransaction(false);

  const hashDisplay = `${hash.substring(0, 15)}...`;
  const stringifiedData = JSON.stringify(data);

  const dataDisplay = !displayTransaction && stringifiedData.length > 35 ?
    `${stringifiedData.substring(0, 35)}...`
    : stringifiedData;

  const getDataDisplay = () => {
    if (displayTransaction) {
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
          <Button
            size='small'
            variant='contained'
            color='primary'
            disableElevation
            onClick={toggleDisplayTransaction}>Mostrar menos</Button>
        </div>
      )
    }

    return (
      <div>
        <div>Dados: {dataDisplay}</div>
        <br/>
        <Button
          size='small'
          variant='contained'
          color='primary'
          disableElevation
          onClick={toggleDisplayTransaction}>Mostrar mais</Button>
      </div>
    )
  }

  return (
    <Container>
      <div>Hash: {hashDisplay}</div>
      <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
      <div>
        {getDataDisplay()}
      </div>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid #fff;
  padding: 5%;
  margin: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const useDisplayTransaction = (initialState = false) => {
  const [displayTransaction, setDisplayTransaction] = useState(initialState)
  const toggleDisplayTransaction = () => {
    setDisplayTransaction(!displayTransaction)
  }

  return [displayTransaction, toggleDisplayTransaction]
}

export default Block;
