import React, {useState} from 'react';
import styled from 'styled-components';
import { Creators as BlockActions } from '../store/ducks/blocks';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import Block from './Block';
import CircularProgress from '@material-ui/core/CircularProgress';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

const Blocks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BlockActions.getBlocks())
  }, [dispatch])

  const { requesting, blocks, error } = useSelector(({ blocks }) => ({ ...blocks }));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (requesting) return <CircularProgress />;

  return (
    <Stepper activeStep={activeStep} orientation='vertical'>
      {blocks.map(({ data, hash, timestamp }) => {
        return(
          <Step key={hash}>
            <StepLabel>{hash}</StepLabel>
            <StepContent>
              <Block data={data} hash={hash} timestamp={timestamp} />
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Voltar
                </Button>
                {activeStep !== blocks.length - 1 &&
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Próximo
                </Button>}
              </div>
            </StepContent>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default Blocks;
