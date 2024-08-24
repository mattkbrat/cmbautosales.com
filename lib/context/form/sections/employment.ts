import type { InputMap, OverrideSectionKeys } from "@/types";
import type { ApplicationState } from "../credit-application";

export const employmentKeys = [
	"company",
	"employmentLength",
	"companyAddress",
	"companyTel",
	"supervisor",
	"jobDescription",
	"department",
	"income",
] as const;

export type EmploymentKeys = typeof employmentKeys;
type employmentSection = OverrideSectionKeys<EmploymentKeys>;

const employmentSection: employmentSection = [
	{
		type: "text",
		text: "Company Name",
		hint: "",
		key: "company",
	},
	{
		type: "number",
		text: "Length of employment",
		hint: "in years",
		key: "employmentLength",
	},
	{
		type: "text",
		text: "Company Address",
		hint: "",
		key: "companyAddress",
	},
	{
		type: "phone",
		text: "Company Phone #",
		hint: "",
		key: "companyTel",
	},
	{
		type: "text",
		text: "Supervisor Name",
		hint: "",
		key: "supervisor",
	},
	{
		type: "text",
		text: "Department",
		hint: "",
		key: "department",
	},
	{
		type: "text",
		text: "job description",
		hint: "",
		key: "jobDescription",
	},
	{
		type: "number",
		text: "Monthly Income",
		hint: "in USD",
		key: "income",
		step: 100,
	},
];

export const employment: InputMap<ApplicationState>["EMPLOYMENT"] = [
	{
		key: "Employment History",
		fields: employmentSection,
	},
];
