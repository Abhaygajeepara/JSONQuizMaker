
export const SET_JSON_INPUT = 'SET_JSON_INPUT';
export const SET_IS_HIDE = 'SET_IS_HIDE';

export const setJsonInput = (jsonInput) => ({
  type: SET_JSON_INPUT,
  payload: jsonInput,
});
export const setIsHide = (isHide) => ({
  type: SET_IS_HIDE,
  payload: isHide,
});