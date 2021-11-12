import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Utilities/renderWithRouter';
import { NotFound } from '../components';

describe('Teste Page requested not found', () => {
  it('Teste se página contém um texto Page "requested not found 😭" ', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading',
      { name: /page requested not found crying emoji/i }))
      .toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i }))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
