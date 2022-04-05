import React, { Fragment } from 'react';
import { Notification, Section } from 'rbx';
import './App.scss';
import Router from './routes';

const App = () => (
  <Fragment>
    {/* Chamando a página inicial */}
    <Router />
  </Fragment>
)

export default App;
