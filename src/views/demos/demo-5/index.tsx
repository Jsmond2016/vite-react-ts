import React, { useContext, useMemo, useState } from 'react';

// how to return component in custom hooks 这是作者 2019 年的方案；貌似不是最优解；
// refer-video: https://www.youtube.com/watch?v=-UjbTFc9NL4

const formContext = React.createContext<Pick<Api, 'values' | 'setValues'>>({} as any);

function useForm() {
  const [values, setValues] = useState({});
  const api = {
    values,
    setValues,
    formContext,
  };
  const Form = useFormComponent(api);
  return {
    ...api,
    Form,
  };
}

type IState = {
  setValues: React.Dispatch<React.SetStateAction<any>>;
  values: any;
};
type Api = IState & {
  formContext: React.Context<IState>;
};

function useFormComponent(api: Api) {
  const Form = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      ({ children, ...others }: any) => {
        console.log('others: ', others);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { formContext } = Form.api;
        console.log('render---->>> form');
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          <formContext.Provider value={Form.api}>
            <form>{children}</form>
          </formContext.Provider>
        );
      },
    [],
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Form.api = api;
  return Form;
}
const Input = ({ fieldName }: { fieldName: string }) => {
  const { values, setValues } = useContext(formContext);
  return (
    <input
      value={values[fieldName]}
      onChange={(e) => {
        e.persist();
        setValues((old: any) => ({ ...old, [fieldName]: e.target.value }));
      }}
    />
  );
};

function App() {
  const { Form, values, setValues } = useForm();

  return (
    <div className="wrapper">
      <Form test="testId">
        <div style={{ display: 'flex' }}>
          <Input fieldName="foo" />
          &nbsp;
          <button
            onClick={() =>
              setValues((oldValues) => ({
                ...oldValues,
                ramdom: Math.random(),
              }))
            }
          >
            button
          </button>
        </div>
      </Form>
      <br />
      <br />
      {JSON.stringify(values, null, 2)}
    </div>
  );
}

export default App;
