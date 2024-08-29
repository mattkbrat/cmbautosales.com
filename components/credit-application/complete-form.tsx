import { APPLICATION_STATES, useFormContext } from "@/lib/context";
import type { ReferenceNumber } from "@/lib/context/form/sections";
import { Fragment, useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export const CompleteFormSection = () => {
	const { state, images, dispatch } = useFormContext();

	const statuses = useMemo(() => {
		const filterKey =
			state.housingOrRenting === "renting"
				? APPLICATION_STATES.HOUSING.title
				: APPLICATION_STATES.RENTING.title;

		console.log({ state: state.housingOrRenting, filterKey });
		const states = Object.entries(APPLICATION_STATES).map(
			([k, { title, hash }]) => {
				if (k === "PERSONAL") {
				}
				if (!k || !title) return null;

				if (
					title === filterKey ||
					title === APPLICATION_STATES.INTRODUCTION.title ||
					title === APPLICATION_STATES.APPLICABLE_FORM.title
				) {
					console.log("excluding", { title, filterKey });
					return null;
				}

				let complete = false;
				if (title === APPLICATION_STATES.PERSONAL.title) {
					complete = !!state.lastName;
				} else if (title === APPLICATION_STATES.EMPLOYMENT.title) {
					complete = !!state.supervisor;
				} else if (title === APPLICATION_STATES.HOUSINGORRENTING.title) {
					complete = true;
				} else if (title === APPLICATION_STATES.HOUSING.title) {
					complete = !!state.mortgage;
				} else if (title === APPLICATION_STATES.RENTING.title) {
					complete = !!state.landlordName;
				} else if (title.startsWith("Reference")) {
					const key = Number(title.slice(-1)) as ReferenceNumber;
					complete = !!state[`phone-${key}`];
				} else if (title === APPLICATION_STATES.PICTURES.title) {
					complete = images.current.length === 3;
				}
				return {
					state: title,
					hash,
					complete,
				};
			},
		);

		return states.filter((s) => !!s);
	}, [state, images.current.length]);

	const returnToSection = (section: string) => {
		dispatch({ type: "set", value: section, key: "section" });
	};

	return (
		<div className="space-y-4">
			{/* <pre>{JSON.stringify(statuses, null, 2)}</pre> */}
			<h2 className="text-lg underline">Submit Form?</h2>
			<div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-center">
				<div className="contents text-lg underline font-bold ">
					<span />
					<span>Section</span>
				</div>
				{statuses.map(({ state, complete, hash }) => {
					return (
						<Fragment key={state}>
							<span>{complete ? <FaCheck /> : <FaX color="red" />}</span>
							<button
								type="button"
								className="text-left"
								onClick={() => {
									returnToSection(hash);
								}}
							>
								{state}
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
			</section>
		</div>
	);
};
