import axios from "axios";
import { Item } from "../Context/Appcontext";

const api = axios.create({
	baseURL: "http://localhost:3333/api",
});

const getResource = (resource: string) => {
	return api.get<Item[]>(resource);
};

const storeProduct = (item: Item) => {
	const data = api
		.post<Item>("/products", item)
		.then((response) => response.data);

	return data;
};

export { getResource, storeProduct };
