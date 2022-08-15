import { Table } from "@mantine/core";
import { useContext } from "react";
import AppContext, { ActionTypes } from "../../Context/Appcontext";
import { Button } from "@mantine/core";

const TableApp: React.FC = () => {
  const [state, dispatch] = useContext(AppContext);
  const ths = (
    <tr>
      <th>Description</th>
      <th>Quantity</th>
      <th>Unitary Price</th>
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
    index: number
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

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const rows = state.list.map((item, index) => (
    <tr key={index}>
      <td onClick={() => onEdit(item, index)}>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{numberFormatter.format(item.unitaryPrice)}</td>
      <td>{numberFormatter.format(item.quantity * item.unitaryPrice)}</td>
      <td>
        <Button
          color="red"
          radius="xl"
          size="xs"
          compact
          onClick={() => alert("DELETE")}
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
