import { departureService } from "../../services/departure.service";
import {
    SET_DEPARTURES,
    UPDATE_DEPARTURE,
} from "../reducers/departure.reducer.js";

// Load all code blocks and dispatch them to the store
export function loadDepartures() {
    return async (dispatch) => {
        try {
            const departures = await departureService.query();
            const action = {
                type: SET_DEPARTURES,
                departures,
            };
            dispatch(action);
        } catch (error) {
            console.log("error:", error);
        }
    };
}

// Update a code block and dispatch the updated code block to the store
export function updateDeparture(departure) {
    return async (dispatch) => {
        try {
            const updatedDeparture = await departureService.update(departure);
            const action = {
                type: UPDATE_DEPARTURE,
                updatedDeparture,
            };
            dispatch(action);
        } catch (error) {
            console.log("error:", error);
        }
    };
}
