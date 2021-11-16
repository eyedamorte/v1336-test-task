import { createSelector } from "@reduxjs/toolkit";

import type { RootReducerType } from "../../store";

export const getBrigades = createSelector(
  (state: RootReducerType) => state.brigades.brigades,
  (value) => value
);

export const getFilteredBrigades = createSelector(
  (state: RootReducerType) => state.brigades.filteredBrigades,
  (value) => value
);


export const getBrigadesIsPending = createSelector(
  (state: RootReducerType) => state.brigades.isPending,
  (value) => value
);
