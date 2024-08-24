import type { InputMap, OverrideSectionKeys } from "@/types";
import type { ApplicationState } from "../credit-application";

export const housingKeys = ["mortgage", "phone", "ownPayment"] as const;

export type HousingKeys = typeof housingKeys;
type housingSection = OverrideSectionKeys<HousingKeys>;

const housingSection: housingSection = [
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

export const housing: InputMap<ApplicationState>["HOUSING"] = [
	{
		key: "housing",
		fields: housingSection,
	},
];
