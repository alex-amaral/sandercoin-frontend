import Container from '@material-ui/core/Container';
import React from 'react';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    {...other}>
    {value === index && (
      <Container align='center'>
        {children}
      </Container>
    )}
  </div>
)

export default TabPanel;
