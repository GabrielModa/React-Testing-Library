import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Utilities/renderWithRouter';
import App from '../App';

describe('Testa se a página contém as informações sobre a Pokédex', () => {
  it('Teste se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    expect(screen.getByRole('heading',
      { name: /about pokédex/i, level: 2 })).toBeInTheDocument();

    expect(screen.getByRole('img', { name: /pokédex/i }))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

