import type { FormKey } from "@/lib/context/form/sections";
import type { FileInputProps } from "flowbite-react";
import type { HTMLInputTypeAttribute } from "react";

export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type { InvTitles } from "@/lib/cars-for-sale";
export type { Inventory, InventoryDetails } from "@/lib/database/auto-sales";

export type ReadonlyStringArray = Readonly<string[]>;

type InputAttributes<T extends ReadonlyStringArray> = {
	hint?: string;
	optional?: true;
	key: T[number];
	text: string;
	name?: string;
};

type InputType = HTMLInputTypeAttribute;
type SpecialInputTypes = Extract<InputType, "radio" | "file">;

type InputTypeExcluded = Exclude<InputType, SpecialInputTypes>;

export type InputMapField<T extends ReadonlyStringArray> =
	| ({
			type?: InputTypeExcluded;
			step?: number;
	  } & InputAttributes<T>)
	| ({
			type: "radio";
			options: {
				key: string;
				value: string;
			}[];
	  } & InputAttributes<T>)
	| ({
			type: "file";
			accept: FileInputProps["accept"];
	  } & InputAttributes<T>);

export type InputMapFieldSection<T extends ReadonlyStringArray> = {
	key?: string;
	fields: InputMapField<T>[];
};

export interface InputMapParams {
	root: ReadonlyStringArray;
	fieldKeys: ReadonlyStringArray;
}

export type InputMap<T extends InputMapParams> = {
	[form in T["root"][number]]: InputMapFieldSection<T["fieldKeys"]>[];
};

export type OverrideSectionKeys<T extends readonly string[]> =
	(InputMapField<T> & {
		key: ArrayElement<T>;
	})[];
