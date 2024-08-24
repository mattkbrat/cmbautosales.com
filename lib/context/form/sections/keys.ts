import type { EmploymentKeys } from "./employment";
import type { HousingKeys } from "./housing";
import type { PersonalKeys } from "./personal";
import { ReferenceKeys } from "./reference";
import type { RentingKeys } from "./renting";

type InternalKey =
	| "section"
	| "breadcrumbs"
	| "housingOrRenting"
	| "formSelection"
	| "confirm";

export type FormKeys =
	| PersonalKeys
	| HousingKeys
	| RentingKeys
	| EmploymentKeys;

export type FormKey =
	| PersonalKeys[number]
	| HousingKeys[number]
	| RentingKeys[number]
	| EmploymentKeys[number]
	| ReferenceKeys<1>[number]
	| ReferenceKeys<2>[number]
	| ReferenceKeys<3>[number]
	| ReferenceKeys<4>[number]
	| ReferenceKeys<5>[number]
	| ReferenceKeys<6>[number]
	| InternalKey;
