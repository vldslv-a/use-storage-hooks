import { configure } from '@testing-library/react';
import React from 'react';

global.React = React;

configure({ asyncUtilTimeout: 1000 });

global.console.error = jest.fn().mockImplementation((error: string) => {
  throw new Error(error);
});

global.console.warn = jest.fn().mockImplementation((error: string) => {
  throw new Error(error);
});
