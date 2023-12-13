export const SET_DEPARTURES = "SET_DEPARTURES";
export const UPDATE_DEPARTURE = "UPDATE_DEPARTURE";

const INITIAL_STATE = {
    departures: [],
};

export function departureReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case SET_DEPARTURES:
            return {
                ...state,
                departures: action.departures,
            };
        case UPDATE_DEPARTURE:
            return {
                ...state,
                departures: Array.isArray(state.departures)
                    ? state.departures.map((departure) =>
                          departure._id === action.updatedDeparture._id
                              ? action.updatedDeparture
                              : departure
                      )
                    : [],
            };

        default:
            return state;
    }
}
