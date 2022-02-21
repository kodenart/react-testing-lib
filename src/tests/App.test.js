import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing the App component...', () => {
  it('tests if there`s three fixed nav links', () => {
    renderWithRouter(<App />);
    // Home LINK
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    // About LINK
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    // Favorite LINK
    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favLink).toBeInTheDocument();
  });

  it('checks if the pathname is correct for homeLink', () => {
    const { history } = renderWithRouter(<App />);

    // grabs the link
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    // checks if we're at Home pathname
    const homePath = history.location.pathname;
    expect(homePath).toBe('/');
  });

  it('checks if the pathname is correct for aboutLink', () => {
    const { history } = renderWithRouter(<App />);

    // grabs the link
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    // checks if we're at about pathname
    const aboutPath = history.location.pathname;
    expect(aboutPath).toBe('/about');
  });

  it('checks if the pathname is correct for favLink', () => {
    const { history } = renderWithRouter(<App />);

    // grabs the link
    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favLink).toBeInTheDocument();
    userEvent.click(favLink);
    // checks if we're at favorite pathname
    const favPath = history.location.pathname;
    expect(favPath).toBe('/favorites');
  });

  it('checks if the router is redirecting to the Not Found page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/random-url-to-test-the-router');
    // checks if we're at favorite pathname
    const notFoundHeading = screen.getByText(/Page requested not found/i);
    expect(notFoundHeading).toBeInTheDocument();
  });
});
