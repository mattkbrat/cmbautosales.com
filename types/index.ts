export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type { InvTitles } from "@/lib/cars-for-sale";
export type { Inventory, InventoryDetails } from "@/lib/database/auto-sales";
