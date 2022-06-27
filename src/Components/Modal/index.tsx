import { useContext } from "react";
import { Modal, Button, Group } from "@mantine/core";
import AppContext, { ActionTypes } from "../../Context/Appcontext";

const FormModal: React.FC = () => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <>
      <Modal
        opened={state.modal}
        title="Introduce yourself!"
        onClose={() =>
          dispatch({ payload: false, type: ActionTypes.SET_CLOSE_MODAL })
        }
      >
        {/* Modal content */}
      </Modal>
      <Group position="center">
        <Button
          onClick={() =>
            dispatch({ payload: true, type: ActionTypes.SET_OPEN_MODAL })
          }
        >
          Open Modal
        </Button>
      </Group>
    </>
  );
};
export default FormModal;
