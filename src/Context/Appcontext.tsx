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
		name: "wellington",
		unitaryPrice: 1,
		quantity: 5,
	},
	list: [{ name: "Flour", unitaryPrice: 1, quantity: 1 }],
	modal: false,
	total: 0,
};

export enum ActionTypes {
	SET_ITEM = "SET_ITEM",
	SET_OPEN_MODAL = "SET_OPEN_MODAL",
	SET_CLOSE_MODAL = "SET_CLOSE_MODAL",
}

type ActionsPayloads = {
	[ActionTypes.SET_CLOSE_MODAL]: boolean;
	[ActionTypes.SET_OPEN_MODAL]: boolean;
	[ActionTypes.SET_ITEM]: Item;
};

export type AppActions =
	ActionMap<ActionsPayloads>[keyof ActionMap<ActionsPayloads>];

const AppContext = createContext<[InitialState, (param: AppActions) => void]>([
	initialState,
	() => null,
]);

function reducer(state: InitialState, action: any) {
	switch (action.type) {
		case ActionTypes.SET_ITEM:
			const items = [...initialState.list, action.payload];

			return { ...state, list: [...state.list, action.payload] };

		case ActionTypes.SET_CLOSE_MODAL:
			return { ...state, modal: action.payload };

		case ActionTypes.SET_OPEN_MODAL:
			return { ...state, modal: action.payload };

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
		console.log(state);
	}, [state]);
	return (
		<AppContext.Provider value={[state, dispatch]}>
			{children}
		</AppContext.Provider>
	);
};
export default AppContext;
