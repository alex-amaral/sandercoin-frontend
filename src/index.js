import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store'
import './index.scss';
import {createMuiTheme} from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e66'
    },
    text: {
      primary: '#fff'
    }
  }
})

render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={App} />
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
