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
