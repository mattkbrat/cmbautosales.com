import type { InputMapFieldSection } from "@/types";

export const proofsKeys = ["paystub", "license", "residency"] as const;

export type ProofsKeys = typeof proofsKeys;
type Return = InputMapFieldSection<ProofsKeys>;

const proofsSection: Return["fields"] = [
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

export const proofs: Return[] = [
	{
		key: "Proofs",
		fields: proofsSection,
	},
];
