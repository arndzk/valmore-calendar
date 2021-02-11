import { ADD_EVENT, SELECT_DATE, GET_EVENTS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    case ADD_EVENT:
      return {
        ...state,
        events: action.payload,
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};
