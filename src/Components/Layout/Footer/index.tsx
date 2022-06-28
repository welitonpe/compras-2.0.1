import { useContext } from "react";
import AppContext, { ActionTypes } from "../../../Context/Appcontext";
import AddButton from "../../AddButton/index";

const FooterApp: React.FC = () => {
	const [state, dispatch] = useContext(AppContext);
	return (
		<div
			style={{
				position: "absolute",
				top: "-20px",
				right: "40px",
			}}
		>
			<AddButton
				onClick={() =>
					dispatch({ payload: true, type: ActionTypes.SET_OPEN_MODAL })
				}
			/>
		</div>
	);
};
export default FooterApp;
