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
