import React from 'react';
import styled from 'styled-components';
import { Creators as BlockActions } from '../store/ducks/blocks';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import Block from './Block';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const Blocks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BlockActions.getBlocks())
  }, [dispatch])

  const { requesting, blocks, error } = useSelector(({ blocks }) => ({ ...blocks }));

  return (
    <Container align='center'>
      <div><Link to='/'>Home</Link></div>
      <h3>Blocks</h3>
      <BlocksContainer>
        {requesting
          ? <div><CircularProgress /></div>
          :blocks.map(({ data, hash, timestamp }) => {
            return(
              <Block key={hash} data={data} hash={hash} timestamp={timestamp} />
            )
        })}
      </BlocksContainer>
    </Container>
  )
}

const BlocksContainer = styled.div`
  max-width: 500px;
`

export default Blocks;
