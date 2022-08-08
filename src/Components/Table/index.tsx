import { Table } from "@mantine/core";
import { useContext } from "react";
import AppContext from "../../Context/Appcontext";

const TableApp: React.FC = () => {
  const [state] = useContext(AppContext);

  const ths = (
    <tr>
      <th>Description</th>
      <th>Quantity</th>
      <th>Unitary Price</th>
      <th>Total Price</th>
    </tr>
  );

  const rows = state.list.map(({ name, unitaryPrice, quantity }, index) => (
    <tr key={index}>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{unitaryPrice}</td>
      <td>{quantity * unitaryPrice}</td>
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
