import React, { createContext, useReducer, ReactNode, useEffect } from "react";

export type ActionMap<M extends { [index: string]: any }> = {
  [key in keyof M]: M[key] extends undefined
    ? {
        type: key;
      }
    : {
        payload: M[key];
        type: key;
      };
};

export type Item = {
  id?: number;
  name: string;
  unitaryPrice: number;
  quantity: number;
};

type InitialState = {
  item: Item;
  list: Item[];
  modal: boolean;
  total: number;
};

const initialState: InitialState = {
  item: {
    id: 0,
    name: "",
    unitaryPrice: 0,
    quantity: 0,
  },
  list: [],
  modal: false,
  total: 0,
};

export enum ActionTypes {
  SET_LIST = "SET_LIST",
  UPDATE_ITEM_LIST = "UPDATE_ITEM_LIST",
  SET_ITEM = "SET_ITEM",
  SET_MODAL_VISIBLE = "SET_MODAL_VISIBLE",
}

type ActionsPayloads = {
  [ActionTypes.SET_MODAL_VISIBLE]: boolean;
  [ActionTypes.SET_LIST]: Item;
  [ActionTypes.SET_ITEM]: Item;
  [ActionTypes.UPDATE_ITEM_LIST]: Item;
};

export type AppActions =
  ActionMap<ActionsPayloads>[keyof ActionMap<ActionsPayloads>];

const AppContext = createContext<[InitialState, (param: AppActions) => void]>([
  initialState,
  () => null,
]);

function reducer(state: InitialState, action: any) {
  switch (action.type) {
    case ActionTypes.SET_LIST:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case ActionTypes.SET_MODAL_VISIBLE:
      return {
        ...state,
        modal: action.payload,
        item: {
          name: "",
          unitaryPrice: 0,
          quantity: 0,
        },
      };

    case ActionTypes.SET_ITEM:
      return { ...state, item: action.payload };

    case ActionTypes.UPDATE_ITEM_LIST:
      return {
        ...state,
        list: state.list.map((item, index) => {
          if (action.payload.id == index) {
            return action.payload;
          }
          return item;
        }),
      };

    default:
      return state;
  }
}

type AppContextProviderProps = Partial<InitialState>;

export const AppContextProvider: React.FC<
  AppContextProviderProps & { children: ReactNode }
> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });
  useEffect(() => {
    console.log("ESTADO", state);
  }, [state]);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
