import React from 'react';
import { getByRole, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('testing the About component...', () => {
  it('tests if theres info about what is a pokedex', () => {
    renderWithRouter(<About />);
    const infoText = /One can filter Pokémons by type, and see more details/;
    const info = screen.getByText(infoText);
    expect(info).toBeInTheDocument();
  });

  it('tests if theres a h2 with About Pokédex as text', () => {
    const { container } = renderWithRouter(<About />);
    const titleText = /About Pokédex/;
    // did without screen just to learn how to do it actually... turns out I did not knew before the attempt
    const title = getByRole(container, 'heading', { level: 2, name: titleText });
    expect(title).toBeInTheDocument();
  });

  it('tests if theres two paragraphs', () => {
    renderWithRouter(<About />);
    const firstP = screen.getByText(/This application simulates a Pokédex.*all Pokémons/);
    expect(firstP).toBeInTheDocument();
    const secP = screen.getByText(/One can filter Pokémons.*see more details.*of them/);
    expect(secP).toBeInTheDocument();
  });

  it('tests if theres a specific img', () => {
    renderWithRouter(<About />);
    const theUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const theImg = screen.getByRole('img');
    expect(theImg.src).toBe(theUrl);
  });
});
