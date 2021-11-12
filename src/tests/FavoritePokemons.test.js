import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Utilities/renderWithRouter';
import App from '../App';

describe('Testa se é exibido o Pokemon Favorito ou "No favorite pokemon found".', () => {
  it('Teste se é exibido "No favorite pokemon found".', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const noFavoriteFound = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoriteFound).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(detailsPokemon).toBeInTheDocument();

    userEvent.click(detailsPokemon);
    expect(history.location.pathname).toContain('/pokemons');

    userEvent.click(screen.getByText('Pokémon favoritado?'));
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toContain('/favorites');

    const starCount = screen.getAllByRole('img', { name: /favorite/i });
    expect(starCount.length).toBe(1);
  });
});
