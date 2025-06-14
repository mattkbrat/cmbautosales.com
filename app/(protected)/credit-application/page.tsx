import dynamic from "next/dynamic";
const CreditApplication = dynamic(() => import("./CreditAppView"));

const CreditAppPage = () => {
	return (
		<>
			<CreditApplication />
		</>
	);
};

export default CreditAppPage;
