import { SET_JSON_INPUT,SET_IS_HIDE } from './actions';

const initialState = {
  jsonInput: `{
    "quiz":[
        {
            "question":"Enter questions?",
            "options":["Option 1", "Option 2", "Option 3", "Option 4"],
            "answer":"Option 1"
        }
    ]
}`,
isHide: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JSON_INPUT:
      return {
        ...state,
        jsonInput: action.payload,
      };
    case SET_IS_HIDE:
      return {
        ...state,
        isHide: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
