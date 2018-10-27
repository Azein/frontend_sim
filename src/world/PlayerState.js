// @flow

import { createReducer } from 'redux-act';
import devGrades from './proto/devGrades';

type InitialState = {
  level: number,
  grade: Object,
  exp: number,
  toNextLvl: number,
  currentExp: number,
  skills: Array<*>,
};

const initialState: InitialState = {
  level: 1,
  grade: devGrades.junior,
  exp: 0,
  toNextLvl: 1000,
  currentExp: 0,
  skills: [],
};

const playerReducer = createReducer(initialState);

export default playerReducer;
