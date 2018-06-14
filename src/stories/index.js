import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DebouncedComponent from './DebouncedField';

storiesOf('DebouncedChanger', module)
  .add('with local State', () => (
    <DebouncedComponent onChange={action('debounce update')} value="some value" />
  ));
