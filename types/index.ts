import type { FileInputProps } from "flowbite-react";
import type { HTMLInputTypeAttribute } from "react";

export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type { InvTitles } from "@/lib/cars-for-sale";
export type { Inventory, InventoryDetails } from "@/lib/database/auto-sales";

export type ReadonlyStringArray = Readonly<string[]>;

type InputAttributes = {
	hint?: string;
	optional?: true;
	key: string;
	text: string;
	name?: string;
};

type InputType = HTMLInputTypeAttribute;
type SpecialInputTypes = Extract<InputType, "radio" | "file">;

type InputTypeExcluded = Exclude<InputType, SpecialInputTypes>;

const i: InputTypeExcluded = "tel";

export type InputMapField =
	| ({
			type?: InputTypeExcluded;
			step?: number;
	  } & InputAttributes)
	| ({
			type: "radio";
			options: {
				key: string;
				value: string;
			}[];
	  } & InputAttributes)
	| ({
			type: "file";
			accept: FileInputProps["accept"];
	  } & InputAttributes);

export type InputMapFieldSection = {
	key?: string;
	fields: InputMapField[];
};

export type InputMap<T extends ReadonlyStringArray[number]> = {
	[form in T]: InputMapFieldSection[];
};

export type OverrideSectionKeys<T extends readonly string[]> =
	(InputMapField & {
		key: ArrayElement<T>;
	})[];
