import starshipsReducer, {
  StarshipsState,
  getStarshipsByPage,
  selectStarships,
  selectStarshipsPrevious,
  selectStarshipsNext,
  selectStarshipsLoading,
  selectStarshipsError,
} from './starshipsSlice';

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
      previous: 'https://swapi.dev/api/starships/?page=2',
      next: 'https://swapi.dev/api/starships/?page=3',
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
  const initialState: StarshipsState = {
    data: {
      count: 0,
      results: [
        mockStarship
      ],
    },
    status: 'idle' as const,
  };

  it('should handle initial state', () => {
    expect(starshipsReducer(undefined, { type: 'unknown' })).toEqual({
      data: {
        count: 0,
        results: [],
      },
      status: 'idle' as const,
    });
  });

  it('should handle getStarshipsByPage.rejected', () => {
    const actual = starshipsReducer(initialState, getStarshipsByPage.rejected);

    expect(actual.status).toEqual('failed');
  });

  it('should handle getStarshipsByPage.pending', () => {
    const actual = starshipsReducer(initialState, getStarshipsByPage.pending);

    expect(actual.status).toEqual('loading');
  });

  it('should handle getStarshipsByPage.fulfilled', () => {
    const action = {
      type: getStarshipsByPage.fulfilled.type,
      payload: {
        count: 0,
        results: [
          mockStarship
        ],
      }
    }
    const actual = starshipsReducer(initialState, action);

    expect(actual.data.results).toEqual(expect.arrayContaining([mockStarship]));
  });
});

describe('favoriteStarships selectors', () => {
  it('should retrieve list of starships', () => {
    expect(selectStarships(mockState)).toEqual([mockStarship]);
  })

  it('should retrieve previous url for starships', () => {
    expect(selectStarshipsPrevious(mockState)).toEqual('https://swapi.dev/api/starships/?page=2');
  })

  it('should retrieve next url for starships', () => {
    expect(selectStarshipsNext(mockState)).toEqual('https://swapi.dev/api/starships/?page=3');
  })

  it('should retrieve loading state of starships', () => {
    expect(selectStarshipsLoading(mockState)).toEqual(false);
  })

  it('should retrieve error state of starships', () => {
    expect(selectStarshipsError(mockState)).toEqual(false);
  })
});