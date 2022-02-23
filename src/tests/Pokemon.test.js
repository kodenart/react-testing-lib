import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testing the Pokemon component', () => {
  // isFavorite is to set the pokemon unit as a favorite one
  it('tests the Pokemon component, checks the contents of it', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    // destructuring the necessary variables
    const { name, type, averageWeight, image } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    // to prevent repetitions
    const dataTestIdName = screen.getAllByTestId('pokemon-name');
    const dataTestIdType = screen.getAllByTestId('pokemon-type');
    const datatestIdAvarageWeight = screen.getAllByTestId('pokemon-weight');

    // grabs the sprite
    const img = screen.getByRole('img', { name: `${name} sprite` });

    // checks the name of the pokemon being displayed
    expect(dataTestIdName[0].textContent).toBe(name);
    // checks the type of the pokemon being displayed
    expect(dataTestIdType[0].textContent).toBe(type);
    // checks the weight
    expect(datatestIdAvarageWeight[0].textContent).toBe(
      `Average weight: ${value} ${measurementUnit}`,
    );
    // img...
    expect(img).toHaveProperty('src', image);
    // alt to the img tag...
    expect(img).toHaveProperty('alt', `${name} sprite`);
  });

  it('tests if the location after the Link is clicked is the expected', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    // grabs the link, saves where his pointing to, click it, checks if redirected correctly...
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    const redirect = detailsLink.href;
    detailsLink.click();
    expect(redirect).toBe(redirect);
  });

  test('tests if the location is the path expected', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const { id } = pokemons[0];
    const detailsLink = screen.getByRole('link', { name: /more details/i });

    // pretty obvious
    detailsLink.click();
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('tests if theres any indication (favorite icon/alt text) on the pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const { name } = pokemons[0];
    // grabs the icon
    const favoriteIcon = screen.getByRole('img',
      { name: `${name} is marked as favorite` });
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
