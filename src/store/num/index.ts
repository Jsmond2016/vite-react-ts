"use strict"
const actions: any = {
  add: (newState: { num: number }) => {
    newState.num++
  }
}
export default {
  state: {
    num: 20
  },
  actions,
  asyncActions: {
    newAdd: (dispatch: Function) => {
      setTimeout(() => {
        dispatch({ type: "add" })
      }, 1000)
    }
  }
}
