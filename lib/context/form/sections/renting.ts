import type { InputMap, OverrideSectionKeys } from "@/types";
import type { ApplicationState } from "../credit-application";

export const rentingKeys = [
	"rentPayment",
	"landlordName",
	"landlordPhone",
] as const;

export type RentingKeys = typeof rentingKeys;
type RentingSection = OverrideSectionKeys<RentingKeys>;

const rentingSection: RentingSection = [
	{
		type: "number",
		text: "Payment Per Month",
		hint: "in USD",
		key: "rentPayment",
		step: 50,
	},
];

const landlordSection: RentingSection = [
	{
		type: "text",
		text: "Landlord's Name",
		hint: "",
		key: "landlordName",
	},
	{
		type: "tel",
		text: "Phone #",
		hint: "",
		key: "landlordPhone",
	},
];

export const renting: InputMap<ApplicationState>["RENTING"] = [
	{
		key: "Renting",
		fields: rentingSection,
	},
	{
		key: "Landlord's Information",
		fields: landlordSection,
	},
];
