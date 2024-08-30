import { UserBar } from "@/components";
import { getServerSession } from "@/lib/auth";
import { FormProvider } from "@/lib/context";
import { redirect } from "next/navigation";

const CreditApplicationLayout = async ({
	children,
}: { children: React.ReactNode }) => {
	const session = await getServerSession();

	if (!session?.user) {
		return redirect("/auth/signin?returnTo=/credit-application");
	}
	return (
		<div
			className="mx-[10dvw] flex flex-col mt-4 border-t-[0.4rem] rounded-lg flex-1
		  "
		>
			<div className="gap-4 flex flex-col form flex-1 ">
				<section className="bg-darkblue-transparent px-4 py-2 space-y-2">
					<h1 className="text-2xl">CMB Auto Sales - Credit Application</h1>
					<hr />
					<UserBar intro="Submitting as" user={session.user} />
				</section>
				<div className="flex flex-col flex-1">
					<FormProvider form={"credit"}>{children}</FormProvider>
				</div>
			</div>
		</div>
	);
};

export default CreditApplicationLayout;
