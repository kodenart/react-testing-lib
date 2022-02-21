import React from 'react';
import { getByRole, getByTestId, getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testing the notFound page...', () => {
  it('tests if the page has a h2...', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/random-path-with-no-route');
    // const theDamnEmoji = /\x{1F62D}/u;
    const heading = screen.getByText(/Page requested not found/);
    // the only way I could "capture" the emoji
    expect(getByRole(heading, 'img', { name: 'Crying emoji' })).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    console.log(heading.innerHTML);
  });

  it('tests if the gif the gif is in the page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/random-path-with-no-route');
    const gifAlt = 'Pikachu crying because the page requested was not found';
    const gifUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const theGif = screen.getByRole('img', { name: gifAlt });
    // comparing the actual src with the expected src
    expect(theGif.src).toBe(gifUrl);
  });
});
