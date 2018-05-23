import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf, linkTo } from '@storybook/react';

import Welcome from './Welcome';

import { action, configureActions } from '@storybook/addon-actions';


import DebouncedComponent from "./DebouncedField";

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));


storiesOf('DebouncedChanger', module)
  .add('with local State', () => (
    <DebouncedComponent onChange={action('debounce update')} value="some value" />
  ))