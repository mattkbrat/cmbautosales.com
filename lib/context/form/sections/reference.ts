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
