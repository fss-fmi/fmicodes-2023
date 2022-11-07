import React from 'react';
import ReactDOM from 'react-dom';
import NavbarProfile from './NavbarProfile';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavbarProfile />, div);
  ReactDOM.unmountComponentAtNode(div);
});