import { formList, useForm } from "@mantine/form";
import { Box, TextInput, NumberInput, Button, Group } from "@mantine/core";
import { useContext } from "react";
import AppContext, { ActionTypes, Item } from "../../Context/Appcontext";

const Form: React.FC = () => {
  const [state, dispatch] = useContext(AppContext);
  const { errors, values, getInputProps, onSubmit } = useForm<Item>({
    initialValues: state?.item
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
    dispatch({ payload: form, type: ActionTypes.SET_ITEM });
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={onSubmit((values) => console.log(values))}>
        <TextInput
          label="Description"
          placeholder="Name"
          {...getInputProps("name")}
        />
        <NumberInput
          mt="sm"
          label="Unitary Price"
          placeholder="0"
          {...getInputProps("unitaryPrice")}
        />
        <NumberInput
          mt="sm"
          label="Quantity"
          placeholder="0"
          {...getInputProps("quantity")}
        />

        <Group position="right" mt="md">
          <Button type="button" onClick={() => _onSubmit(form)}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Form;
