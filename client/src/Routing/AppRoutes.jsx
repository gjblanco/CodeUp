import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  hashHistory
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import PrivateRoute from './PrivateRoute';
import RootRoute from './RootRoute';
import codeUpApp from '../../redux/reducers/combineReducers';
import Search from '../components/Search';
import Login from '../components/LoginComponent';
import App from '../components/App';
import Events from '../containers/Events';
import Profile from '../containers/Profile';
import '../styles/styles.scss';

const store = createStore(codeUpApp, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const AppRoutes = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <div>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={RootRoute}/>
        <Route path="/profile/:username" component={Profile} />
        <PrivateRoute path="/search" component={Search} />
        <PrivateRoute path="/events" component={Events} />
      </div>
    </Router>
  </Provider>
);
export default AppRoutes;