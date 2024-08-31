import { InventoryCarousel } from "@/components/inventory";
import {
	getIndividualInventory,
	getIndividualInventoryTitle,
} from "@/lib/database";
import type { Metadata } from "next/types";
import { Fragment } from "react";

type Props = {
	params: {
		invID: string;
	};
	searchParams: undefined;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route params
	const id = params.invID;

	const title = await getIndividualInventoryTitle(id);

	// fetch data

	return {
		title: `Cars For Sale | ${title} | CMB Auto Sales`,
		description:
			"Cars for sale in Fort Morgan, Colorado from established dealership CMB Auto Sales",
	};
}

const IndividualInvPage = async ({ params: { invID } }: Props) => {
	const {
		inventoryImageMtm,
		sold,
		hidden: _hidden,
		title,
		...inventory
	} = (await getIndividualInventory(invID)) || {};

	const images = inventoryImageMtm?.map((m) => m.image);
	return (
		<>
			<div className="my-auto">
				<h1 className="text-3xl">{title}</h1>
				<p>{sold ? "sold" : "available"}</p>
			</div>
			<div className="flex flex-col md:flex-row lg:flex-col 2xl:flex-row min-h-full my-auto md:pl-4 mx-auto md:space-x-4 space-y-4">
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-[repeat(1,_auto_1fr)] gap-x-4 gap-y-2  uppercase">
						{Object.entries(inventory).map(([k, v]) => {
							return (
								v && (
									<Fragment key={k}>
										<p className="text-gray-700">{k}</p>
										<p>{v}</p>
									</Fragment>
								)
							);
						})}
					</div>
				</div>
				<div className="self-center">
					{images && title && <InventoryCarousel data={images} title={title} />}
				</div>
			</div>
		</>
	);
};

export default IndividualInvPage;
