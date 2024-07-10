import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import Footer from '../components/Footer';
beforeEach(() => {
  fetchMock.resetMocks();
});
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Footer Component', () => {
  test('renders the component and checks initial state', () => {
    renderWithRouter(<Footer />);
    expect(
      screen.getByText(
        'GeekMart offers a wide range of high-quality products from fashion and electronics to home essentials, all at competitive prices. Enjoy fast and reliable shipping, exceptional customer service, and secure shopping. Choose GeekMart for unbeatable value and a seamless, enjoyable shopping experience.',
      ),
    ).toBeInTheDocument();
  });
  test('renders the logo image', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toHaveAttribute('src', '/logo.png');
  });

  test('renders navigation links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Navigate')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('products')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('Order')).toBeInTheDocument();
  });
  test('renders collection links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Collection')).toBeInTheDocument();
    expect(screen.getByText('Fashion')).toBeInTheDocument();
    expect(screen.getByText('Electronic')).toBeInTheDocument();
    expect(screen.getByText('Furniture')).toBeInTheDocument();
  });
  test('renders copyright text', () => {
    renderWithRouter(<Footer />);
    expect(
      screen.getByText('© Copyright 2024, all Rights Reserved by GeekLords'),
    ).toBeInTheDocument();
  });
});