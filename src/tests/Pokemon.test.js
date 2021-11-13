import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Utilities/renderWithRouter';
import App from '../App';

describe('Verifica se é renderizado um card com as informações do pokémon', () => {
  it('Testa se o nome do Pokémon é mostrado na tela ', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('img', { name: /sprite/i })).toBeInTheDocument();
  });
  it('Testa se o tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
  });
  it('Testa se peso médio do pokémon deve ser exibido com um texto no formato', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/average weight/i)).toBeInTheDocument();
  });
  it('Testa se a imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('img', { name: /sprite/i }))
      .toHaveAttribute('alt', 'Pikachu sprite');

    expect(screen.getByRole('img', { name: /sprite/i }))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Testa se existe um link que o redireciona para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetaisLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetaisLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    userEvent.click(screen.getByText('Pokémon favoritado?'));
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();

    expect(screen.getByRole('img', { name: /favorite/i }))
      .toHaveAttribute('alt', 'Pikachu is marked as favorite');

    expect(screen.getByRole('img', { name: /favorite/i }))
      .toHaveAttribute('src', '/star-icon.svg');
  });
  it('Testa se o tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
  });
});
