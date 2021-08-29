/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import {create, act} from 'react-test-renderer';

it('renders correctly', () => {
  let root = {toJSON: () => {}};

  act(() => {
    root = create(<App />);
  });

  expect(root.toJSON()).toMatchSnapshot();
});
