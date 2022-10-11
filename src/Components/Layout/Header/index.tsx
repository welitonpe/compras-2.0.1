import { useContext } from "react";
import AppContext from "../../../Context/Appcontext";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

const HeaderApp: React.FC = () => {
  const [context, dispatch] = useContext(AppContext);

  const totalvalue = context?.list.length
    ? context?.list
        .map((item) => item?.quantity * item?.unitaryPrice)
        .reduce((previus, current) => previus + current)
    : 0;

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  };

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      <div style={style}>
        <div>COMPRAS</div>
        <Alert icon={<IconAlertCircle size={16} />} color="green">
          {currencyFormatter(totalvalue)}
        </Alert>
      </div>
    </>
  );
};
export default HeaderApp;
