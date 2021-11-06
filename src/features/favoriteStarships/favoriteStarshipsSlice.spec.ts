import favoriteStarshipsReducer, {
  FavoriteStarshipsState,
  addFavoriteStarship,
  removeFavoriteStarship,
  updateFavoriteStarshipNote,
  selectFavoriteStarships,
} from './favoriteStarshipsSlice';

const mockStarship = {
  name: 'Sentinel-class landing craft',
  manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
  hyperdrive_rating: '4.5',
  passengers: '75',
};

describe('favoriteStarships reducer', () => {
  const initialState: FavoriteStarshipsState = {
    data: []
  };

  it('should handle initial state', () => {
    expect(favoriteStarshipsReducer(undefined, { type: 'unknown' })).toEqual({
      data: []
    });
  });

  it('should handle addFavoriteStarship', () => {
    favoriteStarshipsReducer(initialState, addFavoriteStarship(mockStarship));

    expect.arrayContaining([mockStarship]);
  });

  it('should handle removeFavoriteStarship', () => {
    favoriteStarshipsReducer(initialState, addFavoriteStarship(mockStarship));
    favoriteStarshipsReducer(initialState, removeFavoriteStarship(mockStarship.name));

    expect.not.arrayContaining([mockStarship]);
  });

  it('should handle updateFavoriteStarshipNote', () => {
    favoriteStarshipsReducer(initialState, addFavoriteStarship(mockStarship));
    const note = `Phong's favorite starship`;
    const favoriteStarship = {
      ...mockStarship,
      note,
    };

    favoriteStarshipsReducer(initialState, updateFavoriteStarshipNote(favoriteStarship));

    expect.arrayContaining([favoriteStarship]);
  });
});

describe('favoriteStarships selector', () => {
  it('should retrieve list of favorite starships', () => {
    const mockState = {
      starships: {
        data: {
          count: 0,
          results: [
            mockStarship
          ],
        },
        status: 'idle' as const,
      },
      favoriteStarships: {
        data: [
          mockStarship,
        ]
      }
    }

    expect(selectFavoriteStarships(mockState)).toEqual([mockStarship]);
  })
})