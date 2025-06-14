export const rentingKeys = [
	"rentPayment",
	"landlordName",
	"landlordPhone",
] as const;

export type RentingKeys = typeof rentingKeys;
