import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    color: theme.text
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(2),
  },
}));

const Blocks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BlockActions.getBlocks())
  }, [dispatch])

  const { requesting, blocks, error } = useSelector(({ blocks }) => ({ ...blocks }));

  const [activeStep, setActiveStep] = useState(blocks.length || -1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  }

  if (requesting) return <CircularProgress />;

  return (
    <div className={classes.root}>
      {activeStep === -1 && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Button onClick={handleReset}>Ver o primeiro bloco</Button>
        </Paper>
      )}
      <Stepper activeStep={activeStep} orientation='vertical'>
        {blocks.map(({ data, hash, timestamp }) => {
          return(
            <Step key={hash}>
              <StepLabel>{hash}</StepLabel>
              <StepContent>
                <Block data={data} hash={hash} timestamp={timestamp} />
                <div className={classes.actionsContainer}>
                  <div>
                    {activeStep !== 0 &&
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Voltar
                    </Button>}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep !== blocks.length - 1 ? 'Próximo' : 'Finalizar'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === blocks.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Button onClick={handleReset} className={classes.button}>Ver o primeiro bloco</Button>
        </Paper>
      )}
    </div>
  )
}

export default Blocks;
