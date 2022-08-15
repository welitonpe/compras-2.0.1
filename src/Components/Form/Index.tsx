import { formList, useForm } from "@mantine/form";
import { Box, TextInput, NumberInput, Button, Group } from "@mantine/core";
import { useContext } from "react";
import AppContext, { ActionTypes, Item } from "../../Context/Appcontext";

const Form: React.FC = () => {
  const [state, dispatch] = useContext(AppContext);
  const { errors, values, getInputProps, onSubmit } = useForm<Item>({
    initialValues: state?.item.id
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
    if (state.item.id) {
      dispatch({
        payload: form,
        type: ActionTypes.UPDATE_ITEM_LIST,
      });
      dispatch({ payload: false, type: ActionTypes.SET_MODAL_VISIBLE });
    } else {
      dispatch({
        payload: { ...form, id },
        type: ActionTypes.SET_LIST,
      });
      dispatch({ payload: false, type: ActionTypes.SET_MODAL_VISIBLE });
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
        />

        <NumberInput
          mt="sm"
          label="Unitary Price"
          defaultValue={1000}
          placeholder="0"
          parser={(value) => {
            if (value) {
              return value.replace(/\$\s?|(,*)/g, "");
            }
          }}
          formatter={(value) => {
            if (value) {
              return !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "$ ";
            }
            return "";
          }}
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
