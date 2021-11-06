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
    const actual = favoriteStarshipsReducer(initialState, addFavoriteStarship(mockStarship));

    expect(actual.data).toEqual(expect.arrayContaining([mockStarship]));
  });

  it('should handle removeFavoriteStarship', () => {
    favoriteStarshipsReducer(initialState, addFavoriteStarship(mockStarship));
    const actual = favoriteStarshipsReducer(initialState, removeFavoriteStarship(mockStarship.name));

    expect(actual.data).toEqual(expect.not.arrayContaining([mockStarship]));
  });

  it('should handle updateFavoriteStarshipNote', () => {
    const note = `Phong's favorite starship`;
    const favoriteStarship = {
      ...mockStarship,
      note,
    };

    const favoriteStarshipsState = {
      data: [
        mockStarship,
      ]
    }

    const actual = favoriteStarshipsReducer(favoriteStarshipsState, updateFavoriteStarshipNote(favoriteStarship));

    expect(actual.data).toEqual(expect.arrayContaining([favoriteStarship]));
  });
});

describe('favoriteStarships selector', () => {
  it('should retrieve list of favorite starships', () => {
    expect(selectFavoriteStarships(mockState)).toEqual([mockStarship]);
  })
})