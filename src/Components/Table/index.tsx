import { Table } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import AppContext, { ActionTypes, Item } from "../../Context/Appcontext";
import { Button } from "@mantine/core";
import { getResource } from "../../Axios/Fetcher";

const TableApp: React.FC = () => {
	const [state, dispatch] = useContext(AppContext);
	const [itemList, setItemList] = useState<Item[]>();

	useEffect(() => {
		getResource("/products").then((response) => setItemList(response.data));
	}, []);

	const ths = (
		<tr>
			<th>Desc.</th>
			<th>Qtd</th>
			<th>Unt. P.</th>
			<th>Total Price</th>
			<th>Delet</th>
		</tr>
	);

	const onEdit = (
		item: {
			name: string;
			quantity: number;
			unitaryPrice: number;
		},
		index: string,
	) => {
		dispatch({ payload: true, type: ActionTypes.SET_MODAL_VISIBLE });
		dispatch({
			payload: {
				id: index,
				name: item.name,
				unitaryPrice: item.unitaryPrice,
				quantity: item.quantity,
			},
			type: ActionTypes.SET_ITEM,
		});
	};

	const onDelet = (
		item: {
			name: string;
			quantity: number;
			unitaryPrice: number;
		},
		index: string,
	) => {
		console.log("DELET", index);
		dispatch({
			payload: {
				id: index,
				name: item.name,
				unitaryPrice: item.unitaryPrice,
				quantity: item.quantity,
			},
			type: ActionTypes.REMOVE_ITEM_LIST,
		});
	};

	const numberFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const rows = itemList?.map((item, index) => (
		<tr key={index}>
			<td onClick={() => onEdit(item, item.name)}>{item.name}</td>
			<td>{item.quantity}</td>
			<td>{numberFormatter.format(item.unitaryPrice)}</td>
			<td>{numberFormatter.format(item.quantity * item.unitaryPrice)}</td>
			<td>
				<Button
					color="red"
					radius="xl"
					size="xs"
					compact
					onClick={() => {
						onDelet(item, item.name);
					}}
				>
					X
				</Button>
			</td>
		</tr>
	));

	return (
		<Table striped>
			{/* <caption>Some elements from periodic table</caption> */}
			<thead>{ths}</thead>
			<tbody>{rows}</tbody>
			{/* <tfoot>{ths}</tfoot> */}
		</Table>
	);
};
export default TableApp;
