import type { InputMapFieldSection, OverrideSectionKeys } from "@/types";

export type ReferenceKeys<T extends ReferenceNumber> = [
	`name-${T}`,
	`Street-${T}`,
	`Number-${T}`,
	`floor-${T}`,
	`city-${T}`,
	`state-${T}`,
	`zip-${T}`,
	`phone-${T}`,
	`phone2-${T}`,
];

export type ReferenceNumber = 1 | 2 | 3 | 4 | 5 | 6;

type Return<T extends ReferenceNumber> = InputMapFieldSection<ReferenceKeys<T>>;

// ReferenceSection
function referenceSection<T extends ReferenceNumber>(
	number: ReferenceNumber,
): Return<T>["fields"] {
	return [
		{
			key: `name-${number}` as `name-${T}`,
			text: "Name",
			name: "name",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `Street-${number}` as `Street-${T}`,
			text: "street name",
			name: "street",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `Number-${number}` as `Number-${T}`,
			text: "number",
			name: "number",
			optional: true,
		},
		{
			key: `floor-${number}` as `floor-${T}`,
			text: "Floor, unit...",
			name: "floor",
			optional: true,
		},
		{
			key: `city-${number}` as `city-${T}`,
			text: "City",
			name: "city",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `state-${number}` as `state-${T}`,
			text: "State",
			name: "state",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `zip-${number}` as `zip-${T}`,
			text: "ZIP",
			name: "zip",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `phone-${number}` as `phone-${T}`,
			text: "Phone #",
			name: "phone",
			type: "tel",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `phone2-${number}` as `phone2-${T}`,
			text: "Phone # (work)",
			name: "phone2",
			optional: true,
		},
	];
}

export function reference<T extends ReferenceNumber>(
	number: ReferenceNumber,
): Return<T>[] {
	return [
		{
			key: "reference",
			fields: referenceSection<T>(number),
		},
	];
}
