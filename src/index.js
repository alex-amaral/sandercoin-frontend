import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import history from './utils/history';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './index.scss';
import 'fontsource-roboto';
import { CreateWallet } from './containers/CreateWallet';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: indigo[800],
    },
    text: {
      primary: '#9e9e9e',
    },
  },
});

render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={CreateWallet} />
          <Route exact path="/app" component={App} />
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
