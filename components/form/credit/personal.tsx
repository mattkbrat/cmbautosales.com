import type { CreditFormData } from "@/lib/context/form/sections/keys";
import { useFormContext } from "react-hook-form";
export const PersonalSection = () => {
	const context = useFormContext<CreditFormData>();

	return (
		<>
			<fieldset className="form-section">
				<legend>Personal Information</legend>
				<label>
					Last Name
					<input {...context.register("lastName")} required />
				</label>
				<label>
					First Name
					<input {...context.register("firstName")} required />
				</label>
				<label>
					Middle Initial
					<input {...context.register("middleInitial")} />
				</label>
				<label>
					Primary Phone Number
					<input type="tel" {...context.register("phoneNumber")} required />
				</label>
				<label>
					Length of Stay at address
					<input {...context.register("lengthOfStayAtAddress")} required />
				</label>
				<label>
					Social Security Number (SSN)
					<input {...context.register("SSN")} required />
				</label>
				<label>
					Drivers License Number
					<input {...context.register("driversLicenseNumber")} required />
				</label>
				<label>
					License Expiration
					<input
						type="date"
						{...context.register("licenseExpiration")}
						required
					/>
				</label>
				<label>
					Date Of Birth
					<input type="date" {...context.register("dateOfBirth")} required />
				</label>
			</fieldset>
			<fieldset>
				<legend>Home Address</legend>

				<label>
					Street
					<input {...context.register("street")} required />
				</label>
				<label>
					City
					<input {...context.register("city")} required />
				</label>
				<label>
					State
					<input {...context.register("state")} required />
				</label>
				<label>
					ZIP
					<input {...context.register("zip")} required />
				</label>
			</fieldset>
		</>
	);
};
