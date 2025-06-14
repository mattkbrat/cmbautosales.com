"use client";
import { useFormStore } from "@/lib/context/form/form-store";
import { CompleteFormSection, Introduction } from "../credit-application";
import { EmploymentSection } from "./credit/employment";
import { HousingSection } from "./credit/housing";
import { PersonalSection } from "./credit/personal";
import { ProofsSection } from "./credit/proofs";
import { ReferencesSection } from "./credit/references";
import { SelectFormSection } from "./credit/select";

export function FormSection() {
	const { section } = useFormStore();
	let FormComponent = Introduction;

	switch (section) {
		case "applicable_form":
			FormComponent = SelectFormSection;
			break;
		case "personal":
			FormComponent = PersonalSection;
			break;
		case "pictures":
			FormComponent = ProofsSection;
			break;
		case "employment":
			FormComponent = EmploymentSection;
			break;
		case "housing":
			FormComponent = HousingSection;
			break;
		case "complete":
			FormComponent = CompleteFormSection;
			break;
		case "submit":
			break;
		case "references":
			FormComponent = ReferencesSection;
			break;
		default:
			FormComponent = Introduction;
			break;
	}

	// console.debug({ section });
	return <FormComponent />;
}
