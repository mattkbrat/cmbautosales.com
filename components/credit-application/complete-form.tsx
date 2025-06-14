"use client";
import type { Section } from "@/lib/context";
import { useFormStore } from "@/lib/context/form/form-store";
import type { ReferenceNumber } from "@/lib/context/form/sections";
import { Fragment, useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export const CompleteFormSection = () => {
	const { state, images, setSection } = useFormStore();

	const complete: Omit<
		{ [key in Section]: boolean },
		"applicable_form" | "introduction" | "complete" | "submit"
	> = {
		personal: !!state.lastName,
		pictures: images.length === 3,
		employment: !!state.supervisor,
		housing:
			state.housingOrRenting === "renting"
				? !!state.rentPayment
				: !!state.ownPayment,
		references: !!(state.phone_1 && state.phone_2),
	};

	const returnToSection = (section: Section) => {
		setSection(section);
	};

	return (
		<fieldset className="grid-cols-1">
			{/* <pre>{JSON.stringify(statuses, null, 2)}</pre> */}
			<h2 className="text-lg underline">Submit Form?</h2>
			<div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-center">
				<div className="contents text-lg underline font-bold ">
					<span />
					<span>Section</span>
				</div>
				{Object.entries(complete).map(([k, complete]) => {
					return (
						<Fragment key={k}>
							<span>{complete ? <FaCheck /> : <FaX color="red" />}</span>
							<button
								type="button"
								className="text-left underline text-blue-600 cursor-pointer hover:text-blue-800"
								onClick={() => {
									returnToSection(k as Section);
								}}
							>
								{k}
							</button>
						</Fragment>
					);
				})}
			</div>

			<hr />
			<section className="flex flex-col gap-2">
				<h2>Confirm</h2>
				<span>
					I CERTIFY THAT THE ABOVE INFORMATION IS COMPLETE AND ACCURATE. YOU ARE
					AUTHORIZED TO INVESTIGATE MY CREDIT AND EMPLOYMENT HISTORY AND TO
					RELEASE INFORMATION.
				</span>
				<span className="text-sm">
					CERTIFICO QUE LA INFORMACIÓN ANTERIOR ES COMPLETA Y EXACTA. USTED ESTÁ
					AUTORIZADO PARA INVESTIGAR MI HISTORIAL DE CRÉDITO Y EMPLEO Y PARA
					DIVULGAR INFORMACIÓN.
				</span>
				<fieldset>
					<legend>I confirm</legend>
					<label className="flex">
						<input type="checkbox" required />
						By checking this box and clicking submit below, I agree to the above
						terms.
					</label>
				</fieldset>
			</section>
		</fieldset>
	);
};
