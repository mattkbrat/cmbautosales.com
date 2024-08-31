import type { InputMapFieldSection, OverrideSectionKeys } from "@/types";

export type ReferenceKeys<T extends ReferenceNumber> = [
	`name_${T}`,
	`Street_${T}`,
	`Number_${T}`,
	`floor_${T}`,
	`city_${T}`,
	`state_${T}`,
	`zip_${T}`,
	`phone_${T}`,
	`phone2_${T}`,
];

export type ReferenceNumber = 1 | 2 | 3 | 4 | 5 | 6;

type Return<T extends ReferenceNumber> = InputMapFieldSection<ReferenceKeys<T>>;

// ReferenceSection
function referenceSection<T extends ReferenceNumber>(
	number: ReferenceNumber,
): Return<T>["fields"] {
	return [
		{
			key: `name_${number}` as `name_${T}`,
			text: "Name",
			name: "name",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `Street_${number}` as `Street_${T}`,
			text: "street name",
			name: "street",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `Number_${number}` as `Number_${T}`,
			text: "number",
			name: "number",
			optional: true,
		},
		{
			key: `floor_${number}` as `floor_${T}`,
			text: "Floor, unit...",
			name: "floor",
			optional: true,
		},
		{
			key: `city_${number}` as `city_${T}`,
			text: "City",
			name: "city",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `state_${number}` as `state_${T}`,
			text: "State",
			name: "state",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `zip_${number}` as `zip_${T}`,
			text: "ZIP",
			name: "zip",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `phone_${number}` as `phone_${T}`,
			text: "Phone #",
			name: "phone",
			type: "tel",
			optional: number > 4 ? true : undefined,
		},
		{
			key: `phone2_${number}` as `phone2_${T}`,
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
