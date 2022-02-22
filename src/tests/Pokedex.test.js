import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('testing the Pokedex component...', () => {
  // so I don't repeat the literal string as much as before
  const proxPokemon = 'Próximo pokémon';
  const pokemonTestIdName = 'pokemon-name';
  // function to get the filtered array of pokemons
  const getFilteredPokemons = (typeChosen) => pokemons
    .filter(({ type }) => type === typeChosen);

  it('tests if has a heading with "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    // pretty straight forward
    expect(screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 })).toBeInTheDocument();
  });

  it('tests if the "Próximo pokémon" button works as intended', () => {
    renderWithRouter(<App />);
    // checking existence of the button itself
    const theButton = screen.getByRole('button',
      { name: proxPokemon });
    expect(theButton).toBeInTheDocument();
    const firstPokemon = screen.getByTestId(pokemonTestIdName);
    // checks if every pokemon shows up after clicking in the nextPokemon btn
    pokemons.forEach(({ name }) => {
      const pokemonDisplay = screen.getByText(name);
      expect(pokemonDisplay).toBeInTheDocument();
      userEvent.click(theButton);
    });
    // checks if, after gone through the hole array of pokemons: clicking in next btn should go to index 0
    userEvent.click(theButton);
    const currPokemon = screen.getByTestId(pokemonTestIdName);
    expect(currPokemon.innerHTML).toBe(firstPokemon.innerHTML);
  });

  it('tests if shows one pokemon at a time', () => {
    renderWithRouter(<App />);
    // in every single state, will show only one pokemon
    const nxtBtn = screen.getByRole('button',
      { name: proxPokemon });
    pokemons.forEach(() => {
      expect(screen.getAllByTestId(pokemonTestIdName)).toHaveLength(1);
      userEvent.click(nxtBtn);
    });
  });

  it('tests filter options in general', () => {
    renderWithRouter(<App />);
    // type names...
    // I got lazy by the idea of typing an array with all the pokemon types, so... looked for an abstract and general way of dealing with this problem...
    // bruh, this Set class is AMAZING
    const repeatedTypesArr = pokemons.map(({ type }) => type);
    const soCool = new Set(repeatedTypesArr);
    // the arr I wanted =)
    const typeArr = [...soCool];
    // getting the All type and Next btn for future testing
    const AllBtn = screen.getByRole('button', { name: 'All' });
    const nxtBtn = screen.getByRole('button', { name: proxPokemon });
    // ammount of type buttons to filter the pokemons...
    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    const typeBtnsAmmount = typeArr.length;
    expect(typeBtns).toHaveLength(typeBtnsAmmount);
    // checking the type btn behavior
    // now it got somewhat interesting
    // I'll go through every filtered list...
    typeArr.forEach((typeDesired) => {
      const filteredPokemons = getFilteredPokemons(typeDesired);
      const theFilterBtn = screen.getByRole('button', { name: typeDesired });
      // checking if it appears allways...
      expect(AllBtn).toBeInTheDocument();
      // clicking in the curr filter
      userEvent.click(theFilterBtn);
      // looping on the pokemon list
      // I just need the name and type
      filteredPokemons.forEach(({ name, type }) => {
        // checking if it appears allways...
        expect(AllBtn).toBeInTheDocument();
        // ------------------------ //
        const currPokemonDisplay = screen.getByTestId(pokemonTestIdName);
        // checks if matches...
        expect(currPokemonDisplay.innerHTML).toBe(name);
        // checking if the type is the same as the text on the button clicked to filter
        expect(type).toBe(theFilterBtn.innerHTML);
        // goes to the next of the list
        userEvent.click(nxtBtn);
      });
    });
  });
  // after that ride, let's get back to the boring testing again
  it('tests if the "All" button is working properly', () => {
    // to be honest, I`ve already tested that before, dunno if can be delivered (the project) like that
    // but don't wanna bother any instructor so... let's do one more boring test
    const { history } = renderWithRouter(<App />);
    // just to test it out the last requirement of the requisite
    history.push('/');
    // setting up the env
    // maybe I should've used the beforeEach function in this project... just reminded the existence rn
    const AllBtn = screen.getByRole('button', { name: 'All' });
    const nxtBtn = screen.getByRole('button', { name: proxPokemon });
    expect(AllBtn).toBeInTheDocument();

    // function that will run the whole user behavior for each list of pokemons
    const testListOfPokemons = (arr) => {
      arr.forEach(({ name }) => {
        const curNameDisplayed = screen.getByTestId(pokemonTestIdName);
        expect(curNameDisplayed.innerHTML).toBe(name);
        // ...
        userEvent.click(nxtBtn);
      });
    };
    // --------------------------------- //
    // checks if keeps working after using a filter (Fire)
    const fireBtn = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireBtn);
    const firePokemons = getFilteredPokemons('Fire');
    testListOfPokemons(firePokemons);
    // checks the All button (referred as "reset" by the README)
    userEvent.click(AllBtn);
    testListOfPokemons(pokemons);
  });
});
// overall, I guess can be refactored, but I wanna study some math
