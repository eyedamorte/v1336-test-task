import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IBrigadesState } from "../../interfaces/common";
import dataset from "../../data.json";

const ReducerName = "brigades";

const InitialState: IBrigadesState = {
  brigades: [],
  filteredBrigades: [],
  isPending: false,
};

export const getBrigadesThunk = createAsyncThunk(
  `${ReducerName}/getBrigades`,
  async () => {
    const response = dataset;
    return response;
  }
);

export const BrigadesSlice = createSlice({
  name: ReducerName,
  initialState: InitialState,
  reducers: {
    filterBrigades: (state, action) => {
      state.filteredBrigades = state.brigades.filter((brigade) => {
        return (
          (action.payload.connection === undefined ||
            brigade.connection_state === action.payload.connection) &&
          (action.payload.department === undefined ||
            brigade.department.id === action.payload.department)
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBrigadesThunk.pending, (state, action) => {
      state.isPending = true;
    });
    builder.addCase(getBrigadesThunk.fulfilled, (state, action) => {
      state.brigades = action.payload;
      state.filteredBrigades = action.payload;
      state.isPending = false;
    });
    builder.addCase(getBrigadesThunk.rejected, (state, action) => {
      state.isPending = false;
    });
  },
});

export const { filterBrigades } = BrigadesSlice.actions;

export default BrigadesSlice.reducer;
