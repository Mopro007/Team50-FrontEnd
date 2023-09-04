import { configureStore, createSlice } from '@reduxjs/toolkit';

// User Slice
const userSlice = createSlice({
  name: 'user',
  initialState: { email: '', password: '', phase: 0, project: '' },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setPhase(state, action) {
      state.phase = action.payload;
    },
    nxtPhase(state, action) {
      state.phase++;
    },
    prvsPhase(state, action) {
      state.phase--;
    },
    setProject(state, action) {
      state.project = action.payload;
    },
  },
});

// Project Slice
const projectSlice = createSlice({
  name: 'project',
  initialState: { Project_ID: '', Project_name: '', Project_description: '', Project_participants: [] },
  reducers: {
    set_Project_ID(state, action) {
      state.Project_ID = action.payload;
    },
    set_Project_name(state, action) {
      state.Project_name = action.payload;
    },
    set_Project_description(state, action) {
      state.Project_description = action.payload;
    },
    set_Project_participants_list(state, action) {
      state.Project_participants = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setPhase,
  nxtPhase,
  prvsPhase,
  setProject,
} = userSlice.actions;

export const {
  set_Project_ID,
  set_Project_name,
  set_Project_description,
  set_Project_participants_list,
} = projectSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    project: projectSlice.reducer,
  },
});

export default store;