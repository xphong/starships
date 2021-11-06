import starshipsReducer, {
  StarshipsState,
  getStarshipsByPage,
} from './starshipsSlice';

const mockStarship = {
  name: 'Sentinel-class landing craft',
  manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
  hyperdrive_rating: '4.5',
  passengers: '75',
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
