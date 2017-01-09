import {normalize, schema} from 'normalizr';
import * as types from './actionTypes';
import fetch from '../utils/fetch';
import config from '../config';

const habitant = new schema.Entity('habitants');
const city = new schema.Entity('cities', {
  habitants: [ habitant ]
});
export const cities = [ city ];

export function getNestedList() {
  return (dispatch) => {
    return fetch(`${config.baseUrl}/cities-list`).then((jsonData) => {
      const response = normalize({ cities: jsonData }, {
        cities
      });

      dispatch({
        type: types.FILL_CITIES_LIST,
        payload: {
          cityIds: response.result.cities,
          cityMap: response.entities.cities,
          habitantMap: response.entities.habitants
        }
      });
    });
  };
}
