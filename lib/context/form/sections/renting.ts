import type { InputMapFieldSection, OverrideSectionKeys } from "@/types";

export const rentingKeys = [
	"rentPayment",
	"landlordName",
	"landlordPhone",
] as const;

export type RentingKeys = typeof rentingKeys;
type Return = InputMapFieldSection<RentingKeys>;
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

const landlordSection: Return["fields"] = [
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

export const renting: Return[] = [
	{
		key: "Renting",
		fields: rentingSection,
	},
	{
		key: "Landlord's Information",
		fields: landlordSection,
	},
];
