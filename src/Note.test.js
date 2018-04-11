import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import Note from './Note';

const mockNote = {
  id: '123123',
  createdAt: new Date('08-08-1989'),
  text: 'Sample text without markdown.',
};

it('renders component without markdown correctly', () => {
  const { container } = render(<Router><Note note={mockNote}/></Router>);
  expect(container).toMatchSnapshot();
});

it('renders component with markdown correctly', () => {
  mockNote.text = 'Sample text **with** markdown';
  const { container } = render(<Router><Note note={mockNote}/></Router>);
  expect(container).toMatchSnapshot();
});

it('renders markdown correctly', () => {
  mockNote.text = 'Sample text **with** _many_ markdowns';
  const { container } = render(<Router><Note note={mockNote}/></Router>);
  const markdownDiv = container.querySelector('.dangerousInnerHTML');
  expect(markdownDiv).toMatchSnapshot();
});