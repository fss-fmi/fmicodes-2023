import { render, screen } from '@testing-library/react';
import Navbar from './navbar';
import '@testing-library/jest-dom';

describe('<navbar />', () => {
  test('it should mount', () => {
    render(<Navbar />);

    const navbar = screen.getByTestId('Navbar');

    expect(navbar).toBeInTheDocument();
  });
});
