import type { Section } from "@/lib/context";
import type { CreditFormData } from "@/lib/context/form/sections/keys";
import { useFormContext } from "react-hook-form";

export const SelectFormSection = () => {
	const context = useFormContext<CreditFormData>();
	const referenes: Section = "references";
	const credit: Section = "personal";
	const image: Section = "pictures";
	return (
		<fieldset className="grid grid-cols-[auto_1fr]">
			<legend className="col-span-full">Select a form</legend>
			<label className="flex">
				<input
					type="radio"
					value={credit}
					{...context.register("formSelection")}
				/>
				Credit Application
			</label>
			<label className="flex">
				<input
					type="radio"
					value={referenes}
					{...context.register("formSelection")}
				/>
				References
			</label>

			<label className="flex">
				<input
					type="radio"
					value={image}
					{...context.register("formSelection")}
				/>
				Image Proofs
			</label>
		</fieldset>
	);
};
