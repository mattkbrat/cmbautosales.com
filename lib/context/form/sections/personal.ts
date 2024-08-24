import type { InputMap, OverrideSectionKeys } from "@/types";
import type { ApplicationState } from "../credit-application";

export const personalKeys = [
	"lastName",
	"firstName",
	"middleInitial",
	"phoneNumber",
	"lengthOfStayAtAddress",
	"SSN",
	"driversLicenseNumber",
	"licenseExpiration",
	"dateOfBirth",
	"street",
	"city",
	"state",
	"zip",
] as const;

export type PersonalKeys = typeof personalKeys;

type PersonalSection = OverrideSectionKeys<PersonalKeys>;

const personalInfoSection: PersonalSection = [
	{ key: "lastName", text: "Last Name" },
	{ key: "firstName", text: "First Name" },
	{
		key: "middleInitial",
		text: "Middle Initial",
		optional: true,
		hint: "If on license",
	},
	{ key: "phoneNumber", text: "Phone Number", type: "tel" },
	{
		key: "lengthOfStayAtAddress",
		text: "Length of Stay at Address",
		type: "number",
		hint: "In years",
	},
	{ key: "SSN", text: "Social Security Number" },
	{ key: "driversLicenseNumber", text: "Drivers License Number" },
	{
		key: "licenseExpiration",
		text: "License Expiration Date",
		type: "date",
	},
	{ key: "dateOfBirth", text: "Date of Birth", type: "date" },
];

const homeAddressSection: PersonalSection = [
	{ key: "street", text: "Street" },
	{ key: "city", text: "City" },
	{ key: "state", text: "State" },
	{ key: "zip", text: "Zip" },
];

export const personal: InputMap<ApplicationState>["PERSONAL"] = [
	{
		key: "Personal Info",
		fields: personalInfoSection,
	},
	{
		key: "Applicant Home Address",
		fields: homeAddressSection,
	},
];
