import { sql } from "@vercel/postgres";

const getIndividualInventory = async (id: string): Promise<unknown> => {
	if (Number.isNaN(Number(id))) {
		return sql`
select i.* from inventory i
           join public.image img on i.id = img.inventory
    where i.title = ${decodeURIComponent(id)}
`.then((res) => res.rows as unknown);
	}
	return sql`
select i.* from inventory i
           join public.image img on i.id = img.inventory
    where i.id = ${id}
`.then((res) => res.rows as unknown);
};

const IndividualInvPage = async ({
	params: { invID },
}: { params: { invID: string } }) => {
	const inventory = await getIndividualInventory(invID);

	console.log("ind", inventory, invID);
	return <pre>{JSON.stringify(inventory, null, 2)}</pre>;
};

export default IndividualInvPage;
