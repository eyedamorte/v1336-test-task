import { combineReducers, configureStore } from "@reduxjs/toolkit";
import brigadesReducer from "./features/brigades/BrigadesSlice";

const RootReducer = combineReducers({
  brigades: brigadesReducer,
});

export type RootReducerType = ReturnType<typeof RootReducer>;

const Store = configureStore({
  reducer: RootReducer,
});

export default Store;
