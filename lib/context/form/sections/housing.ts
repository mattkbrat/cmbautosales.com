import type { InputMapFieldSection, OverrideSectionKeys } from "@/types";

export const housingKeys = ["mortgage", "phone", "ownPayment"] as const;

export type HousingKeys = typeof housingKeys;
type Return = InputMapFieldSection<HousingKeys>;
type housingSection = OverrideSectionKeys<HousingKeys>;

const housingSection: Return["fields"] = [
	{
		type: "text",
		text: "Mortgage Company",
		hint: "",
		key: "mortgage",
	},
	{
		type: "tel",
		text: "Phone #",
		hint: "",
		key: "phone",
	},
	{
		type: "number",
		text: "Payment Per Month",
		hint: "in USD",
		key: "ownPayment",
		step: 50,
	},
];

export const housing: Return[] = [
	{
		key: "housing",
		fields: housingSection,
	},
];
