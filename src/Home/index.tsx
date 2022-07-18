import Form from "../Components/Form/Index";
import FormModal from "../Components/Modal";
import TableApp from "../Components/Table";

const Home = () => {
	return (
		<>
			<FormModal>
				<Form />
			</FormModal>
			<TableApp />
		</>
	);
};
export default Home;
