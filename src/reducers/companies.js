import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/actionTypes';


function companiesItems(state = new List(), action) {
  switch (action.type) {
    case types.ADD_COMPANIES_ITEM:
      return;
    case types.FILL_COMPANIES:
      return fromJS(action.payload.companyIds);
    default:
      return state;
  }
}

function companiesItemsById(state = new Map(), action) {
  switch (action.type) {
    case types.ADD_COMPANIES_ITEM:
      return;
    case types.FILL_COMPANIES:
      return fromJS(action.payload.companyMap);
    default:
      return state;
  }
}

function employeeById(state = new Map(), action) {
  switch (action.type) {
    case types.ADD_COMPANIES_ITEM:
      return;
    case types.FILL_COMPANIES:
      return fromJS(action.payload.employeesMap);
    default:
      return state;
  }
}

export default combineReducers({
  companiesAllIds: companiesItems,
  companiesById: companiesItemsById,
  employeesById: employeeById
});