import {
  ADD_EVENT,
  SELECT_DATE,
  GET_EVENTS,
  SELECT_EVENT,
  VIEW_EVENTS,
} from '../types';

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
    case SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      };
    case VIEW_EVENTS:
      return {
        ...state,
        isViewing: action.payload,
      };
    default:
      return state;
  }
};
