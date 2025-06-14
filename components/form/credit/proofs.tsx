import { FileInputWrapper } from "../FileInput";
export const ProofsSection = () => {
	return (
		<fieldset className="form-section">
			<legend>Proofs</legend>

			<label>
				<span>
					Proof of Employment (paystub)
					<br />
					Talón de pago
				</span>
				<FileInputWrapper title="paystub" accept="image/png, image/jpeg" />
			</label>
			<label>
				<span>
					Driver&apos;s License
					<br />
					Licencia
				</span>
				<FileInputWrapper title="license" accept="image/png, image/jpeg" />
			</label>
			<label>
				<span>
					Proof of residency
					<br />
					Prueba de residencia
				</span>
				<FileInputWrapper title="residency" accept="image/png, image/jpeg" />
			</label>
		</fieldset>
	);
};
