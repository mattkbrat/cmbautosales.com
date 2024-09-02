import { CompleteFormSection, Introduction } from "@/components";
import type { ArrayElement, InputMap } from "@/types";
import {
	proofs,
	personal,
	employment,
	housing,
	renting,
	reference,
	type FormKey,
	type ProofsKeys,
} from "./sections";

const sections = [
	"introduction",
	"applicable_form",
	"personal",
	"pictures",
	"employment",
	"housingOrRenting",
	"housing",
	"renting",
	"complete",
	"reference_1",
	"reference_2",
	"reference_3",
	"reference_4",
	"reference_5",
	"reference_6",
	"submit",
] as const;

export type Section = ArrayElement<typeof sections>;

export const APPLICATION_STATES: {
	[key in Uppercase<Section>]: {
		hash: Section;
		introduction?: string;
		title?: string;
		next?: Section | null;
		component?: () => React.ReactNode;
	};
} = {
	INTRODUCTION: {
		hash: "introduction",
		introduction: "",
		title: "Introduction",
		component: () => <Introduction />,
	},
	APPLICABLE_FORM: {
		hash: "applicable_form",
		introduction: "This form is split into several sections.",
		component: () => (
			<>
				<section className="flex flex-row gap-2  flex-1">
					<h3>Which form are you filling out?</h3>
				</section>
				<p>You can come back later to fill out a different half.</p>
			</>
		),
		title: "Applicable Form",
	},
	PERSONAL: {
		hash: "personal",
		introduction: "Applicant Info",
		title: "Personal Information",
	},
	EMPLOYMENT: {
		hash: "employment",
		introduction: "",
		title: "Employment",
	},
	HOUSINGORRENTING: {
		hash: "housingOrRenting",
		introduction: "",
		title: "Housing or Renting",
	},
	HOUSING: {
		hash: "housing",
		introduction: "Only complete if buying / own",
		title: "Housing information",
		next: "complete",
	},
	RENTING: {
		hash: "renting",
		introduction: "Only complete if renting",
		title: "Renting information",
		next: "complete",
	},
	COMPLETE: {
		hash: "complete",
		introduction: "",
		title: "",
		component: () => <CompleteFormSection />,
		next: "submit",
	},
	REFERENCE_1: {
		hash: "reference_1",
		introduction: "Please list at least 2.",
		title: "Reference #1",
	},
	REFERENCE_2: {
		hash: "reference_2",
		introduction:
			"Please list a reference who resides in a different address from the first reference listed.",
		title: "Reference #2",
	},
	REFERENCE_3: {
		hash: "reference_3",
		introduction: "",
		title: "Reference #3",
	},
	REFERENCE_4: {
		hash: "reference_4",
		introduction: "",
		title: "Reference #4",
	},
	REFERENCE_5: {
		hash: "reference_5",
		introduction: "",
		title: "Reference #5",
	},
	REFERENCE_6: {
		hash: "reference_6",
		introduction: "",
		title: "Reference #6",
		next: "complete",
	},
	SUBMIT: {
		hash: "submit",
		introduction:
			"Thank you for your submission. Please wait for us to reach back out to you.",
		title: "Form Submitted",
		next: null,
	},
	PICTURES: {
		hash: "pictures",
		introduction: "",
		title: "Proofs",
		next: "complete",
	},
} as const;

export const applicationStates = Object.keys(APPLICATION_STATES);
export const applicationRouteData = Object.values(APPLICATION_STATES);

export type ApplicationState = keyof typeof APPLICATION_STATES;
export type ApplicationHash =
	(typeof APPLICATION_STATES)[ApplicationState]["hash"];

export type CreditInputMap = InputMap<{
	root: ApplicationState[];
	fieldKeys: FormKey[] | ProofsKeys;
}>;

export const inputs: CreditInputMap = {
	PERSONAL: personal,
	INTRODUCTION: [
		{
			key: "confirm",
			fields: [
				{
					key: "confirm",
					text: "I have all of this information",
					type: "checkbox",
				},
			],
		},
	],
	APPLICABLE_FORM: [
		{
			key: "Select a Form",
			fields: [
				{
					type: "radio",
					text: "",
					options: [
						{
							key: APPLICATION_STATES.PERSONAL.hash,
							value: "Start with Credit Application",
						},
						{
							key: APPLICATION_STATES.REFERENCE_1.hash,
							value: "Skip to References",
						},
						{
							key: APPLICATION_STATES.PICTURES.hash,
							value: "Submit image proofs",
						},
					],
					key: "formSelection",
				},
			],
		},
	],
	PICTURES: proofs,
	HOUSINGORRENTING: [
		{
			key: "Housing Or Renting",
			fields: [
				{
					type: "radio",
					text: "",
					options: [
						{
							key: APPLICATION_STATES.HOUSING.hash,
							value: "Housing",
						},
						{
							key: APPLICATION_STATES.RENTING.hash,
							value: "Renting",
						},
					],
					key: "housingOrRenting",
				},
			],
		},
	],
	EMPLOYMENT: employment,
	REFERENCE_1: reference<1>(1),
	REFERENCE_2: reference<2>(2),
	REFERENCE_3: reference<3>(3),
	REFERENCE_4: reference<4>(4),
	REFERENCE_5: reference<5>(5),
	REFERENCE_6: reference<6>(6),
	SUBMIT: [],
	HOUSING: housing,
	RENTING: renting,
	COMPLETE: [
		{
			key: "confirm",
			fields: [
				{
					type: "radio",
					text: "",
					key: "submitConfirm",
					options: [
						{
							key: "submitConfirm",
							value:
								"By checking this box and clicking submit below, I agree to the above terms. ",
						},
					],
				},
			],
		},
	],
} as const;
