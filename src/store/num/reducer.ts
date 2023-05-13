"use strict"
import handleNum from "./index"

const reducer = (state = { ...handleNum.state }, action: { type: string, value: any }) => {
  let newState = JSON.parse(JSON.stringify(state))
  const actionList = Object.keys(handleNum.actions)
  if (actionList.some(item => item === action.type)) {
    handleNum.actions[action.type](newState, action.value)
  }
  return newState
}
export default reducer
