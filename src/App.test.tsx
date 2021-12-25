import React from 'react';
import { render, screen } from '@testing-library/react';
import TextRecognizer from "./components/TextRecognizer";

test('renders learn react link', () => {
  render(<textRecognizer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
