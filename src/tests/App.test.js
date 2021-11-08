import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Utilities/renderWithRouter';

describe('Testando o Router Dom', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeInTheDocument();
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/Not-Found');
    const headingNotFound = screen.getByRole('img', { name: /crying emoji/i });
    expect(headingNotFound).toBeInTheDocument();
  });
});
