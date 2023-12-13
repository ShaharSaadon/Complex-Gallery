import thunk from "redux-thunk";
import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore as createStore,
} from "redux";
import { paintingReducer } from "./reducers/painting.reducer.js";
import { departureReducer } from "./reducers/departure.reducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    paintingModule: paintingReducer,
    departureModule: departureReducer,
});

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
