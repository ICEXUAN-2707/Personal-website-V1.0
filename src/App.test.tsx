import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders project title', () => {
  render(<App />);
  const titleElement = screen.getByText(/个人介绍网站/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders setup complete message', () => {
  render(<App />);
  const messageElement = screen.getByText(/项目基础设施已搭建完成/i);
  expect(messageElement).toBeInTheDocument();
});
