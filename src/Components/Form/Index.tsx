import { useForm } from "@mantine/form";
import { Box, TextInput, NumberInput, Button, Group } from "@mantine/core";

const Form: React.FC = () => {
	const form = useForm<{
		name: string;
		unitaryPrice: number;
		quantity: number;
	}>({
		initialValues: { name: "", unitaryPrice: 0, quantity: 0 },
		validate: (values) => ({
			name: values.name.length < 2 ? "Too short name" : null,
			unitaryPrice: values?.unitaryPrice < 0 ? "" : null,
			quantity: values?.quantity < 0 ? "" : null,
			// age:
			// 	values.age === undefined
			// 		? "Age is required"
			// 		: values.age < 18
			// 		? "You must be at least 18"
			// 		: null,
		}),
	});

	return (
		<Box sx={{ maxWidth: 340 }} mx="auto">
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<TextInput
					label="Description"
					placeholder="Name"
					{...form.getInputProps("name")}
				/>
				<NumberInput
					mt="sm"
					label="Unitary Price"
					placeholder="0"
					{...form.getInputProps("unitaryPrice")}
				/>
				<NumberInput
					mt="sm"
					label="Quantity"
					placeholder="0"
					{...form.getInputProps("quantity")}
				/>

				<Group position="right" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
	);
};

export default Form;
