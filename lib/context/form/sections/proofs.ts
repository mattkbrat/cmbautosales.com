import type { InputMap, OverrideSectionKeys } from "@/types";
import type { ApplicationState } from "../credit-application";

export const proofsKeys = ["paystub", "license", "residency"] as const;

export type ProofsKeys = typeof proofsKeys;
type ProofsSection = OverrideSectionKeys<ProofsKeys>;

const proofsSection: ProofsSection = [
	{
		type: "file",
		text: "Paystub",
		hint: "Talón de pago",
		key: "paystub",
		accept: "image/png, image/jpeg",
	},
	{
		type: "file",
		text: "License",
		hint: "Licencia",
		key: "license",
		accept: "image/png, image/jpeg",
	},
	{
		type: "file",
		text: "Proof of residency",
		hint: "Prueba de residencia",
		key: "residency",
		accept: "image/png, image/jpeg",
	},
];

export const proofs: InputMap<ApplicationState>["PICTURES"] = [
	{
		key: "Proofs",
		fields: proofsSection,
	},
];
