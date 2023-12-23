// import React, { ReactElement, useMemo, useState } from 'react';

// type ComponentFactory<P> = (props: P) => ReactElement | null;

// export function useComponent<P>(component: ComponentFactory<P>, props: P): ReactElement {
//   const memoizedComponent = useMemo(() => component, [component]);

//   const Comp = useMemo(() => {
//     return React.createElement(memoizedComponent, props);
//   }, [memoizedComponent, props]);

//   return Comp;
// }

// type ButtonProps1 = {
//   handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
// };
// const useEditButton = () => {
//   const [state, setState] = useState(0);
//   const EditButton = useComponent(
//     ({ handleClick }: ButtonProps1) => <button onClick={handleClick}>click me</button>,
//     { handleClick: () => setState(state + 1) },
//   );
//   return EditButton;
// };

// const APP = () => {
//   const EditButton = useEditButton();
//   return (
//     <div>
//       <EditButton />
//     </div>
//   );
// };

// const Component = (props) => {
//   // Your component logic here
//   return <button {...props}>Click me</button>;
// };

// function App() {
//   const { Button, ...rest } = useComponent(Component, {
//     /* your props here */
//   });
//   const { Button2, ...rest2 } = useComponent(Component, {
//     /* your props for Button2 here */
//   });

//   return (
//     <div>
//       <Button />
//       <Button2 />
//     </div>
//   );
// }

// export default App;
