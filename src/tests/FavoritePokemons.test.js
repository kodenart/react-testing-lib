import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testing the favoritePokemons page', () => {
  it('checks if no pokemon appears when none is fav', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/ }));
    const noFavsText = screen.getByText(/No favorite pokemon found/);
    // checks if theres none pokemon appearing
    expect(noFavsText).toBeInTheDocument();
  });

  it('checks if favorite pokemons are shown in the page', () => {
    renderWithRouter(<App />);
    // i`ll use the charmander to test
    const pokemonName = /Charmander/i;
    const nextButton = screen.getByRole('button', { name: /Próximo/ });
    userEvent.click(nextButton);
    // checking if it's really charmander rn
    expect(screen.getByText(pokemonName)).toBeInTheDocument();
    // changing to the details page to fav the pokemon
    const detailsLink = screen.getByText(/More details/);
    userEvent.click(detailsLink);
    // once in the page, just need to toggle the checkbox
    const favBox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/ });
    userEvent.click(favBox);
    // now checks the fav page
    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/ });
    userEvent.click(favLink);
    // checks if charmander is in the list
    expect(screen.getByText(pokemonName)).toBeInTheDocument();
  });
});
