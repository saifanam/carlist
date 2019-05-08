/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global', initialState);

const makeSelectUserLocation = () =>
  createSelector(selectGlobal, homeState => homeState.get('userLocation'));

const makeSelectUserStartDate = () =>
  createSelector(selectGlobal, homeState => homeState.get('userStartDate'));

export { selectGlobal, makeSelectUserLocation, makeSelectUserStartDate };
