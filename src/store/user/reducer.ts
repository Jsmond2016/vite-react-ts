'use strict';
import handleUser from './index';

const reducer = (state = { ...handleUser.state }, action: { type: string; value: any }) => {
  const newState = JSON.parse(JSON.stringify(state));
  const actionList = Object.keys(handleUser.actions);
  if (actionList.some((item) => item === action.type)) {
    handleUser.actions[action.type](newState, action.value);
  }
  return newState;
};
export default reducer;
