import { render, screen } from '@testing-library/react';
import ComingSoonPage from './ComingSoonPage';
import '@testing-library/jest-dom';

test('renders coming soon page', () => {
  render(<ComingSoonPage />);
  const linkElement = screen.getByText(/Coming Soon/i);
  expect(linkElement).toBeInTheDocument();
});
