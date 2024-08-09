export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type { InvHomeData, GroupedInventory } from "@/lib/cars-for-sale";
