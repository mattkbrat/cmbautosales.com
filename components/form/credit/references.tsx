import type { ReferenceNumber } from "@/lib/context/form/sections";
import type { CreditFormData } from "@/lib/context/form/sections/keys";
import { useFormContext } from "react-hook-form";

const ReferenceForm = ({ number }: { number: ReferenceNumber }) => {
	const context = useFormContext<CreditFormData>();
	const required = number <= 2;
	return (
		<>
			<fieldset>
				<legend>Contact #{number}</legend>

				<label>
					Contact's Name
					<input {...context.register(`name_${number}`)} required={required} />
				</label>
				<label>
					Street address
					<input
						{...context.register(`Street_${number}`)}
						required={required}
					/>
				</label>
				<label>
					Number
					<input {...context.register(`Number_${number}`)} />
				</label>
				<label>
					Floor, unit, ...
					<input {...context.register(`floor_${number}`)} />
				</label>
				<label>
					City
					<input {...context.register(`city_${number}`)} required={required} />
				</label>
				<label>
					State
					<input {...context.register(`state_${number}`)} required={required} />
				</label>
				<label>
					Zip
					<input {...context.register(`zip_${number}`)} required={required} />
				</label>
				<label>
					Primary Phone #
					<input {...context.register(`phone_${number}`)} required={required} />
				</label>
				<label>
					Secondary Phone #
					<input {...context.register(`phone2_${number}`)} />
				</label>
			</fieldset>
		</>
	);
};

export const ReferencesSection = () => {
	return (
		<>
			<fieldset className="grid-cols-1">
				<legend>References. Please fill at least 2.</legend>
				<ReferenceForm number={1} />
				<ReferenceForm number={2} />
				<ReferenceForm number={3} />
				<ReferenceForm number={4} />
				<ReferenceForm number={5} />
				<ReferenceForm number={6} />
			</fieldset>
		</>
	);
};
