// import { atom } from 'jotai';
// import { loadable } from 'jotai/utils';

// const delay = <T>(time: number): Promise<T> =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true as T);
//     }, time);
//   });

// // https://github.com/pmndrs/jotai/discussions/1082

// export const atomWithAsync = <T>() => {
//   const baseAtom = atom(async () => {
//     // const res = await fetch(url);
//     // return await res.json();
//     const res = await delay<T>(650);
//     return await res;
//   });
//   const asyncAtom = atom(
//     (get) => get(baseAtom),
//     (_get, set, arg: T) => set(baseAtom, arg),
//   );
//   const loadableAtom = loadable(asyncAtom);
//   const finalAtom = atom(
//     (get) => get(loadableAtom),
//     async (get, set, arg: (state: T) => T) => {
//       const val = typeof arg === 'function' ? arg(await get(asyncAtom)) : arg;
//       set(asyncAtom, val);
//     },
//   );

//   return finalAtom;
// };
