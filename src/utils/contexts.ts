import { createContext, useContext, Context } from 'react';

type InitializeContextRet<T> = [Context<T | undefined>, () => T];
export function initializeContext<T>(): InitializeContextRet<T> {
  const context = createContext<T | undefined>(undefined);

  const useSafeContext = (): T => {
    const contextRef = useContext(context);

    if (contextRef === undefined) {
      throw new Error("Can't use useContext outside of provider");
    }
    return contextRef;
  };

  return [context, useSafeContext];
}
