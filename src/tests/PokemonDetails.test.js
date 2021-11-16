import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Utilities/renderWithRouter';
import App from '../App';

describe('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  it('A página deve conter um texto `<name> Details`,com o nome do Pokémon', () => {
    expect(screen.getByRole('heading', {
      name: /Pikachu Details/i })).toBeInTheDocument();
  });
  it('Não deve existir o link de navegação para os detalhes do Pokémon', () => {
    expect(screen.queryByRole('link', { name: /details/i }))
      .not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    expect(screen.getByRole('heading', { name: /summary/i, level: 2 }))
      .toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    expect(screen.getByText(/this intelligent pokémon roasts hard berries with/i))
      .toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {

  });
  it('testa se detalhes tem heading h2 com o texto Game Locations of <name>', () => {
    expect(screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 }))
      .toBeInTheDocument();
  });
  it('Testa se a imagem da localização contem o atributo "alt" e "src" com a URL', () => {
    const URL_POK_LOC_IMG_1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const URL_POK_LOC_IMG_2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    const Img1 = screen.getAllByRole('img')[1];
    const Img2 = screen.getAllByRole('img')[2];

    expect(Img1.src).toBe(URL_POK_LOC_IMG_1);
    expect(Img1.alt).toBe('Pikachu location');

    expect(Img2.src).toBe(URL_POK_LOC_IMG_2);
    expect(Img2.alt).toBe('Pikachu location');
  });

  it('testa se checkbox adiciona e remove respectivamente da lista de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteCheckbox = screen.queryByRole('checkbox');

    userEvent.click(favoriteCheckbox);
    history.push('/favorites');

    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i }))
      .toBeInTheDocument();
    history.push('/pokemons/25');

    userEvent.click(favoriteCheckbox);
    history.push('/pokemons/10');

    expect(screen.queryByRole('img', { name: /pikachu is marked as favorite/i }))
      .not.toBeInTheDocument();
  });

  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
