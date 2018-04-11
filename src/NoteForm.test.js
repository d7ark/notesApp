import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate, render } from 'react-testing-library';

import { NoteForm } from './NoteForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoteForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('handles submit', () => {
  const testString = 'Test text in textarea.';
  const mockSubmit = jest.fn();

  const { container } = render(<NoteForm onSubmit={mockSubmit} />);
  
  const textArea = container.querySelector('textarea');
  Simulate.change(textArea, { target: { value: testString } } );
  
  const form = container.querySelector('form');
  Simulate.submit(form);
  
  expect(mockSubmit.mock.calls.length).toBe(1);
  expect(mockSubmit.mock.calls[0][0]).toEqual({text: testString});
});

