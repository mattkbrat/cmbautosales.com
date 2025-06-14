"use client";

import { submitCreditApp, submitImage } from "@/actions";
import { FormSection } from "@/components/form/FormSection";
import type { Section } from "@/lib/context/form/credit-application";
import { useFormStore } from "@/lib/context/form/form-store";
import type { CreditFormData } from "@/lib/context/form/sections/keys";
import { FormErrors } from "@/lib/credit-application";
import Link from "next/link";

import { useDeferredValue, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
		dispatch,
	} = useFormStore();
	const sectionRef = useDeferredValue(section);

	const methods = useForm<CreditFormData>();
	const setValue = useRef(methods.setValue);
	// biome-ignore lint/correctness/useExhaustiveDependencies: We only want to update the nav when breadcrumbs changes
	useEffect(() => {
		const el = document.getElementById("breadcrumb-nav");

		if (!el) return;

		el.scrollLeft = el.scrollWidth;
	}, [breadcrumbs]);
	const selected = getSelected();
	const next = getNext();
	const formSelection = methods.watch("formSelection");

	useEffect(() => {
		if (!state.formSelection || formSelection) return;
		for (const k in state) {
			const key = k as keyof CreditFormData;
			const v = state[key] as CreditFormData[keyof CreditFormData];
			setValue.current(key, v);
		}
	}, [formSelection, state, methods.setValue]);

	return (
		<>
			<FormProvider {...methods}>
				<form
					className="form py-2 flex flex-col gap-2 flex-1"
					onSubmit={methods.handleSubmit(async (formData) => {
						dispatch(formData);
						if (sectionRef === "applicable_form") {
							setSection(formData.formSelection as Section);
							return;
						}
						const next = getNext();

						if (section === "pictures") {
							const result = await submitImage(images);
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
					})}
				>
					<FormSection />

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
								{section === "pictures"
									? "Upload Images & Continue"
									: section === "complete"
										? "Submit"
										: "Next"}
							</button>
							{section && (
								<button
									type="button"
									className="btn-dark sm:ml-auto md:mr-4"
									onClick={() => {
										if (
											!confirm("Clear form? This will erase all entered data.")
										)
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
			</FormProvider>
			<section
				aria-label="Form state breadcrumbs"
				className="mt-auto flex flex-wrap gap-x-2"
			>
				{breadcrumbs.map((br, i) => {
					return (
						<button
							type="button"
							key={br}
							className="cursor-pointer "
							onClick={() => {
								setBreadcrumbs(breadcrumbs.slice(0, i));
								setSection(breadcrumbs[i]);
							}}
						>
							<span className="bg-blue-200 px-2 py-px uppercase font-bold outline rounded-md">
								{br}
							</span>
							<span className="mx-1">{"> "}</span>
						</button>
					);
				})}
			</section>
		</>
	);
};

export default CreditApplication;
