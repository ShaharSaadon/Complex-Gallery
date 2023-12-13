export const SET_PAINTINGS = "SET_PAINTINGS";
export const UPDATE_PAINTING = "UPDATE_PAINTING";

const INITIAL_STATE = {
    paintings: [],
};

export function paintingReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case SET_PAINTINGS:
            return {
                ...state,
                paintings: action.paintings,
            };
        case UPDATE_PAINTING:
            return {
                ...state,
                paintings: Array.isArray(state.paintings)
                    ? state.paintings.map((painting) =>
                          painting._id === action.updatedPainting._id
                              ? action.updatedPainting
                              : painting
                      )
                    : [],
            };

        default:
            return state;
    }
}
