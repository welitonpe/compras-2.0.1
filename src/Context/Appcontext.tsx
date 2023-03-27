import { List } from "@mantine/core";
import { AxiosResponse } from "axios";
import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { storeProduct } from "../Axios/Fetcher";

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
		id: -1,
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
	REMOVE_ITEM_LIST = "REMOVE_ITEM_LIST",
	SET_ITEM = "SET_ITEM",
	SET_MODAL_VISIBLE = "SET_MODAL_VISIBLE",
}

type ActionsPayloads = {
	[ActionTypes.SET_MODAL_VISIBLE]: boolean;
	[ActionTypes.SET_LIST]: Item;
	[ActionTypes.UPDATE_ITEM_LIST]: Item;
	[ActionTypes.REMOVE_ITEM_LIST]: Item;
};

export type AppActions =
	ActionMap<ActionsPayloads>[keyof ActionMap<ActionsPayloads>];

const AppContext = createContext<[InitialState, (param: AppActions) => void]>([
	initialState,
	() => null,
]);

async function teste(action: any) {
	await storeProduct(action.payload).then((response) => response);
}

async function reducer(state: InitialState, action: any) {
	switch (action.type) {
		case ActionTypes.SET_LIST:
			const product = await teste(action);

			return {
				...state,
				list: [...state.list, product],
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
				list: state.list.map((item) => {
					if (action.payload.id == item.id) {
						return action.payload;
					}
					return item;
				}),
			};

		case ActionTypes.REMOVE_ITEM_LIST:
			return {
				...state,
				list: state.list.filter((item) => {
					console.log(item, action.payload);

					return action.payload.id !== item.id;
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
