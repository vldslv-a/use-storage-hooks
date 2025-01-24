import { configure } from '@testing-library/react';
import React from 'react';

global.React = React;

configure({ asyncUtilTimeout: 1000 });
