import { Button } from "@mantine/core";

type AddButtonProps = {
	onClick: () => void;
};
const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
	console.log(onClick);
	return (
		<Button color="green" radius="xl" size="xl" compact onClick={onClick}>
			+
		</Button>
	);
};
export default AddButton;
