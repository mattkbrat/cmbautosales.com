import "server-only";

import { sql } from "@vercel/postgres";
import type { InvHomeData } from "@/lib/cars-for-sale";

export const getInventory = async (): Promise<InvHomeData> => {
	return sql`
select i.id as inventory, i.business, im.id as image, i.title, i.*, i.business, im.url
from inventory i
         join image im on i.id = im.inventory
where (i.business = 'cmb' or i.business = 'CMB AUTO SALES')
order by i.title ASC, im.order ASC
`.then((res) => res.rows as InvHomeData);
};
