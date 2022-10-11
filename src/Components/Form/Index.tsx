import { formList, useForm } from "@mantine/form";
import { Box, TextInput, NumberInput, Button, Group } from "@mantine/core";
import { useContext } from "react";
import AppContext, { ActionTypes, Item } from "../../Context/Appcontext";
import { storeProduct } from "../../Axios/Fetcher";

const Form: React.FC = () => {
	const [state, dispatch] = useContext(AppContext);
	const { errors, values, getInputProps, onSubmit } = useForm<Item>({
		initialValues: state.list.length
			? state?.item
			: { name: "", unitaryPrice: 0, quantity: 0 },
		validate: (values) => ({
			name: values?.name.length < 2 ? "Too short name" : null,
			unitaryPrice: values?.unitaryPrice < 0 ? "" : null,
			quantity: values?.quantity < 0 ? "" : null,
		}),
	});

	const form: Item = values;

	const _onSubmit = (form: Item) => {
		let id = state.list.length;

		if (form.id) {
			dispatch({
				payload: form,
				type: ActionTypes.UPDATE_ITEM_LIST,
			});

			return dispatch({ payload: false, type: ActionTypes.SET_MODAL_VISIBLE });
		} else {
			storeProduct(form);
			// dispatch({
			// 	payload: { ...form, id },
			// 	type: ActionTypes.SET_LIST,
			// });
			return dispatch({ payload: false, type: ActionTypes.SET_MODAL_VISIBLE });
		}
	};
	const numberFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return (
		<Box sx={{ maxWidth: 340 }} mx="auto">
			<form>
				<TextInput
					label="Description"
					placeholder="Name"
					{...getInputProps("name")}
					data-autofocus
				/>
				<Box
					style={{
						marginTop: "16px",
					}}
				>
					<label>Unitary Price</label>
					<Box
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<TextInput
							placeholder="Unitary Price"
							{...getInputProps("unitaryPrice")}
							data-autofocus
						/>
						<Button color="red" radius="xs" size="sm" uppercase>
							-
						</Button>
						<Button color="teal" radius="xs" size="sm" uppercase>
							+
						</Button>
					</Box>
				</Box>{" "}
				<Box
					style={{
						marginTop: "16px",
					}}
				>
					<label>Quantity</label>
					<Box
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<TextInput
							placeholder="Quantity"
							{...getInputProps("quantity")}
							data-autofocus
						/>
						<Button color="red" radius="xs" size="sm" uppercase>
							-
						</Button>
						<Button color="teal" radius="xs" size="sm" uppercase>
							+
						</Button>
					</Box>
				</Box>
				{/* <NumberInput
					mt="sm"
					label="Unitary Price"
					placeholder="0"
					defaultValue={0.01}
					precision={2}
					min={0}
					step={0.05}
					{...getInputProps("unitaryPrice")}
				/>
				<NumberInput
					mt="sm"
					label="Quantity"
					placeholder="0"
					{...getInputProps("quantity")}
				/> */}
				<Group position="right" mt="md" style={{ marginTop: "32px" }}>
					<Button type="button" onClick={() => _onSubmit(form)}>
						Submit
					</Button>
				</Group>
			</form>
		</Box>
	);
};

export default Form;
