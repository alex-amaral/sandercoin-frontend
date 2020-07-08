import React from 'react';
import styled from 'styled-components';
import { Creators as BlockActions } from '../store/ducks/blocks';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import Block from './Block';
import CircularProgress from '@material-ui/core/CircularProgress';

const Blocks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BlockActions.getBlocks())
  }, [dispatch])

  const { requesting, blocks, error } = useSelector(({ blocks }) => ({ ...blocks }));

  return (
    <>
      <BlocksContainer>
        {requesting
          ? <div><CircularProgress /></div>
          :blocks.map(({ data, hash, timestamp }) => {
            return(
              <Block key={hash} data={data} hash={hash} timestamp={timestamp} />
            )
        })}
      </BlocksContainer>
    </>
  )
}

const BlocksContainer = styled.div`
  max-width: 500px;
`

export default Blocks;
