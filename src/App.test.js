import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

it('renders without crashing', () => {
  shallow(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
