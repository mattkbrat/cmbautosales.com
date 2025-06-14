import type { CreditFormData } from "@/lib/context/form/sections/keys";
import { useFormContext } from "react-hook-form";
export const HousingSection = () => {
	const context = useFormContext<CreditFormData>();
	const housingOrRenting = context.watch("housingOrRenting");

	return (
		<fieldset className="grid-cols-1">
			<legend>Residency</legend>
			<fieldset>
				<legend>Housing or Renting</legend>
				<label>
					<input
						{...context.register("housingOrRenting")}
						type="radio"
						checked={housingOrRenting === "housing"}
						value="housing"
					/>
					<span>Housing</span>
				</label>
				<label>
					<input
						{...context.register("housingOrRenting")}
						type="radio"
						checked={housingOrRenting === "renting"}
						value={"renting"}
					/>
					<span>Renting</span>
				</label>
			</fieldset>

			{housingOrRenting === "housing" ? (
				<fieldset>
					<legend>Mortgage Company</legend>

					<label>
						Mortgage Company Name
						<input {...context.register("mortgage")} required />
					</label>
					<label>
						Phone #
						<input {...context.register("ownPhone")} required />
					</label>
				</fieldset>
			) : (
				<fieldset>
					<legend>Renting Information</legend>
					<label>
						Landlord&apos;s Name
						<input {...context.register("landlordName")} required />
					</label>
					<label>
						Landlord&apos;s Phone Number
						<input type="tel" {...context.register("landlordPhone")} required />
					</label>
				</fieldset>
			)}
			<fieldset>
				<label>
					Monthly Payment ($)
					<input
						type="number"
						{...context.register(
							housingOrRenting === "housing" ? "ownPayment" : "rentPayment",
						)}
						required
					/>
				</label>
			</fieldset>
		</fieldset>
	);
};
