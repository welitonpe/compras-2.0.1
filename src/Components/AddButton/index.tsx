import { Button } from "@mantine/core";

type AddButtonProps = {
  onClick: () => void;
};
const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Button color="green" radius="sm" size="xl" compact onClick={onClick}>
      +
    </Button>
  );
};
export default AddButton;
