'use strict';
const actions: any = {
  setAge: (newState: { age: number }, value: number) => {
    newState.age = value;
  },
  setRole: (newState: { role: [] }, value: []) => {
    newState.role = value;
  },
};
export default {
  state: {
    name: 'Lucky',
    role: [0, 1, 2, 3],
    sex: 0,
    age: 33,
  },
  actions,
};
