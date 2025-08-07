import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  OutsourceEmployeeType,
  StatisticsType,
} from "../type";

interface YearState {
  currentYear: string;
}

interface PortsState {
  selectedPorts: string[];
}

const yearInitialState: YearState = {
  currentYear: "",
};

const portsInitialState: PortsState = {
  selectedPorts: [],
};

const yearSlice = createSlice({
  name: "year",
  initialState: yearInitialState,
  reducers: {
    setCurrentYear: (state, action: PayloadAction<string>) => {
      state.currentYear = action.payload;
    },
  },
});

const portsSlice = createSlice({
  name: "ports",
  initialState: portsInitialState,
  reducers: {
    togglePort: (state, action: PayloadAction<string>) => {
      const port = action.payload;
      const index = state.selectedPorts.indexOf(port);
      if (index === -1) {
        state.selectedPorts.push(port);
      } else {
        state.selectedPorts.splice(index, 1);
      }
    },
    selectAllPorts: (state, action: PayloadAction<string[]>) => {
      state.selectedPorts = action.payload;
    },
    clearSelectedPorts: (state) => {
      state.selectedPorts = [];
    },
  },
});

export const { setCurrentYear } = yearSlice.actions;
export const { togglePort, selectAllPorts, clearSelectedPorts } =
  portsSlice.actions;

interface LoadingState<T> {
  loading?: boolean;
  loaded?: boolean;
  error?: string;
  data?: T;
}

interface LoaderState {
  loading?: boolean;
  loaded?: boolean;
  error?: string;
  data?: {
    outsourcingEmployeeData: OutsourceEmployeeType[];
    statistics: StatisticsType;
  };
}
const loaderInitialState: LoaderState = {};

const loaderSlice = createSlice({
  name: "loader",
  initialState: loaderInitialState,
  reducers: {
    loaderStart(state) {
      state.loading = true;
      state.error = "";
    },
    loaderSuccess(
      state,
      action: PayloadAction<{
        outsourcingEmployeeData: OutsourceEmployeeType[];
        statistics: StatisticsType;
      }>
    ) {
      state.loading = false;
      state.error = "";
      state.loaded = true;
      state.data = action.payload;
    },
    loaderFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.loaded = true;
      state.error = action.payload;
    },
  },
});

const { loaderStart, loaderSuccess, loaderFail } = loaderSlice.actions;
export { loaderStart, loaderSuccess, loaderFail };

type AISummaryData = { content: string; week: string };
type AISummaryState = LoadingState<Partial<AISummaryData>>;

const aiSummarySlice = createSlice({
  name: "aiSummary",
  initialState: {} as AISummaryState,
  reducers: {
    aiSummaryStart(state) {
      state.loading = true;
      state.error = "";
    },
    aiSummarySuccess(state, action: PayloadAction<AISummaryData>) {
      state.loading = false;
      state.error = "";
      state.loaded = true;
      state.data = action.payload;
    },
    aiSummaryFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.loaded = true;
      state.error = action.payload;
    },
  },
});

const { aiSummarySuccess, aiSummaryStart, aiSummaryFail } =
  aiSummarySlice.actions;
export { aiSummarySuccess, aiSummaryStart, aiSummaryFail };

export const store = configureStore({
  reducer: {
    year: yearSlice.reducer,
    ports: portsSlice.reducer,
    loader: loaderSlice.reducer,
    aiSummary: aiSummarySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
