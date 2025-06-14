import type { CreditFormData } from "@/lib/context/form/sections/keys";
import { useFormContext } from "react-hook-form";
export const EmploymentSection = () => {
	const context = useFormContext<CreditFormData>();

	return (
		<>
			<fieldset className="form-section">
				<legend>Employment History (most recent)</legend>
				<label>
					Company Name
					<input {...context.register("company")} required />
				</label>
				<label>
					Length of Employment
					<input {...context.register("employmentLength")} required />
				</label>
				<label>
					Company Address (street, city, state zip)
					<input {...context.register("companyAddress")} required />
				</label>
				<label>
					Company Phone #
					<input type="tel" {...context.register("companyTel")} required />
				</label>
				<label>
					Supervisor Name
					<input {...context.register("supervisor")} required />
				</label>
				<label>
					Department
					<input {...context.register("department")} required />
				</label>
				<label>
					Job description
					<input {...context.register("jobDescription")} required />
				</label>
				<label>
					Monthly income
					<input type="number" {...context.register("income")} required />
				</label>
			</fieldset>
		</>
	);
};
