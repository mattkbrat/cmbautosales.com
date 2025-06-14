"use client";

import { submitCreditApp, submitImage } from "@/actions";
import { FormSection } from "@/components/form/FormSection";
import {
	APPLICATION_STATES,
	type ApplicationState,
	type Section,
	applicationStates,
	inputs,
} from "@/lib/context/form/credit-application";
import { useFormStore } from "@/lib/context/form/form-store";
import { FormErrors } from "@/lib/credit-application";
import Link from "next/link";

import { useEffect } from "react";

const CreditApplication = () => {
	const {
		section,
		images,
		breadcrumbs,
		state,
		clear: clearForm,
		setSection,
		setBreadcrumbs,
		setId,
		getNext,
		getSelected,
	} = useFormStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only want to update the nav when breadcrumbs changes
	useEffect(() => {
		const el = document.getElementById("breadcrumb-nav");

		if (!el) return;

		el.scrollLeft = el.scrollWidth;
	}, [breadcrumbs]);

	const selected = getSelected();
	const next = getNext();
	const currentSection: ApplicationState = !selected
		? "INTRODUCTION"
		: (applicationStates[selected] as ApplicationState);
	return (
		<>
			<form
				className="form py-2 flex flex-col gap-2 flex-1"
				onSubmit={async (e) => {
					e.preventDefault();
					const next = getNext();

					if (section === APPLICATION_STATES.PICTURES.hash) {
						const formData = new FormData();
						for (const { file: image } of images) {
							formData.append("image", image);
						}

						formData.set("userId", "3");

						const result = await submitImage(formData);
						if (result.status === "error") {
							if (result.message === FormErrors.abuse) {
								throw new Error("Abuse detected");
							}
							return;
						}
					}
					if (selected === null) {
						return;
					}
					if (typeof next !== "string") {
						clearForm();
						return;
					}

					if (next === "submit") {
						const id = await submitCreditApp({
							data: state,
						});

						setId(typeof id === "number" ? id : -1);
					}

					setSection(next);
				}}
			>
				<FormSection inputs={inputs[currentSection]} hash={currentSection} />

				{next !== null ? (
					<div className="flex flex-row gap-2 flex-wrap">
						{breadcrumbs.length > 1 && (
							<button
								type="button"
								className="btn-dark-bg"
								onClick={() => {
									const previous = breadcrumbs.slice(-2)[0];
									setBreadcrumbs(
										breadcrumbs.slice(0, breadcrumbs.indexOf(previous)),
									);
									setSection(previous);
								}}
							>
								Back
							</button>
						)}
						<button type="submit" className="btn-dark-bg">
							{section === APPLICATION_STATES.PICTURES.hash
								? "Upload Images & Continue"
								: section === APPLICATION_STATES.COMPLETE.hash
									? "Submit"
									: "Next"}
						</button>
						{section && (
							<button
								type="button"
								className="btn-dark sm:ml-auto md:mr-4"
								onClick={() => {
									if (!confirm("Clear form? This will erase all entered data."))
										return;
									clearForm();
								}}
							>
								Clear Form
							</button>
						)}
					</div>
				) : (
					<Link href={"/"}>Return to the homepage</Link>
				)}
			</form>
			<section
				aria-label="Form state breadcrumbs"
				className="mt-auto "
				id="breadcrumb-nav"
			>
				{breadcrumbs.map((br, i) => {
					const lookup = br.toUpperCase() as Uppercase<Section>;
					const title: string = APPLICATION_STATES[lookup].title || br;
					return (
						<button
							type="button"
							key={br}
							className="cursor-pointer"
							onClick={() => {
								setBreadcrumbs(breadcrumbs.slice(0, i));
								setSection(breadcrumbs[i]);
							}}
						>
							{title}
						</button>
					);
				})}
			</section>
		</>
	);
};

export default CreditApplication;
