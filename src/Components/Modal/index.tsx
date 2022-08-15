import { useContext, ReactNode } from "react";
import { Modal, Button, Group } from "@mantine/core";
import AppContext, { ActionTypes } from "../../Context/Appcontext";

type FormModalProps = {
  children?: ReactNode;
};

const FormModal: React.FC<FormModalProps> = ({ children }) => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <>
      <Modal
        opened={state.modal}
        title="Product"
        onClose={() =>
          dispatch({ payload: false, type: ActionTypes.SET_MODAL_VISIBLE })
        }
      >
        {children}
      </Modal>
      {/* <Group position="center">
        <Button
          onClick={() =>
            dispatch({ payload: true, type: ActionTypes.SET_OPEN_MODAL })
          }
        >
          Open Modal
        </Button>
      </Group> */}
    </>
  );
};
export default FormModal;
