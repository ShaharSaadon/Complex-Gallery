import { paintingService } from "../../services/painting.service";
import {
    SET_PAINTINGS,
    UPDATE_PAINTING,
} from "../reducers/painting.reducer.js";

// Load all code blocks and dispatch them to the store
export function loadPaintings() {
    return async (dispatch) => {
        try {
            const paintings = await paintingService.query();
            const action = {
                type: SET_PAINTINGS,
                paintings,
            };
            dispatch(action);
        } catch (error) {
            console.log("error:", error);
        }
    };
}

// Update a code block and dispatch the updated code block to the store
export function updatePainting(painting) {
    return async (dispatch) => {
        try {
            const updatedPainting = await paintingService.update(painting);
            const action = {
                type: UPDATE_PAINTING,
                updatedPainting,
            };
            dispatch(action);
        } catch (error) {
            console.log("error:", error);
        }
    };
}
