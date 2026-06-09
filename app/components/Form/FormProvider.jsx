"use client";
import { createContext, useActionState, useContext, useEffect } from "react";
const INIT_STATE = {
  state: undefined,
  isPending: undefined,
  dispatch: undefined,
  errors: null,
};

const FormContext = createContext({ ...INIT_STATE });

export const FormProvider = ({ children, action }) => {
  const [state, dispatch, isPending] = useActionState(action, {
    ...INIT_STATE,
  });

  return (
    <FormContext.Provider value={{ state, dispatch, isPending }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const formContext = useContext(FormContext);

  if (!formContext) throw new Error("Context is not available in this context");

  return formContext;
};
