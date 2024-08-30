import { FormProvider } from "@/lib/context";

const CreditApplicationLayout = async ({
	children,
}: { children: React.ReactNode }) => {
	return (
		<div
			className="mx-[10dvw] flex flex-col mt-4 border-t-[0.4rem] rounded-lg flex-1
		  "
		>
			<div className="gap-4 flex flex-col form flex-1">
				<section className="bg-darkblue-transparent">
					<h1 className="text-2xl">CMB Auto Sales - Credit Application</h1>
				</section>
				<div className="flex flex-col flex-1">
					<FormProvider form={"credit"}>{children}</FormProvider>
				</div>
			</div>
		</div>
	);
};

export default CreditApplicationLayout;
