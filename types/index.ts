export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type {
	InvHomeData,
	GroupedInventory,
	InvTitles,
} from "@/lib/cars-for-sale";
