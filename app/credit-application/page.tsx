"use client";

import { submitImage, submitCreditApp } from "@/actions";
import { FormSection } from "@/components/form/FormSection";
import { useFormContext } from "@/lib/context";
import {
	APPLICATION_STATES,
	applicationRouteData,
	type ApplicationState,
	applicationStates,
	inputs,
	type Section,
} from "@/lib/context/form/credit-application";
import { FormErrors } from "@/lib/credit-application";
import { Breadcrumb } from "flowbite-react";
import Link from "next/link";

import { useEffect, useMemo } from "react";

const CreditApplication = () => {
	const { section, loaded, clearForm, dispatch, images, state, breadcrumbs } =
		useFormContext();

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only want to update the nav when breadcrumbs changes
	useEffect(() => {
		const el = document.getElementById("breadcrumb-nav");

		if (!el) return;

		el.scrollLeft = el.scrollWidth;
	}, [breadcrumbs]);

	const selected = useMemo(() => {
		if (!loaded) return null;
		const curr = applicationRouteData.findIndex((r) => r.hash === section);
		if (curr === -1) {
			console.log({ section }, applicationRouteData);
			return null;
		}

		return curr;
	}, [loaded, section]);

	const next = useMemo(() => {
		if (!selected) return true;
		return applicationRouteData[selected].next;
	}, [selected]);

	const getNext = () => {
		if (!loaded || selected === null) return "";
		if (applicationRouteData[selected].next) {
			return next;
		}
		if (section === APPLICATION_STATES.APPLICABLE_FORM.hash) {
			return state.formSelection;
		}

		if (section === APPLICATION_STATES.HOUSINGORRENTING.hash) {
			return state.housingOrRenting;
		}

		return (
			applicationRouteData[selected + 1]?.hash ||
			APPLICATION_STATES.APPLICABLE_FORM.hash
		);
	};

	const currentSection: ApplicationState = useMemo(() => {
		if (!selected) return "INTRODUCTION";
		return applicationStates[selected] as ApplicationState;
	}, [selected]);
	return (
		<>
			<form
				className="form py-2 flex flex-col gap-2 flex-1"
				onSubmit={async (e) => {
					e.preventDefault();
					const next = getNext();

					if (section === APPLICATION_STATES.PICTURES.hash) {
						const formData = new FormData();
						for (const image of images.current) {
							formData.append("image", image);
						}

						formData.set("userId", "3");

						const result = await submitImage(formData);
						console.log("upload result", result);
						if (result.status === "error") {
							if (result.message === FormErrors.abuse) {
								throw new Error("Abuse detected");
							}
							console.error("Failed to upload images", result.message);
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
							userId: 3,
						});

						dispatch({ key: "id", value: id, type: "set" });
					}

					try {
						dispatch({ type: "set", value: next, key: "section" });
					} catch (e) {
						console.error("Failed to switch page");
					}
				}}
			>
				{loaded && selected !== null && (
					<FormSection inputs={inputs[currentSection]} hash={currentSection} />
				)}

				{loaded && next !== null ? (
					<div className="flex flex-row gap-2 flex-wrap">
						{loaded && breadcrumbs.length > 1 && (
							<button
								type="button"
								className="btn-dark-bg"
								onClick={() => {
									const previous = breadcrumbs.slice(-2)[0];
									const newBreadcrumbs = breadcrumbs.slice(0, -1);
									dispatch({
										type: "set",
										value: newBreadcrumbs,
										key: "breadcrumbs",
									});
									dispatch({
										type: "set",
										value: previous,
										key: "section",
									});
								}}
							>
								Back
							</button>
						)}
						{/* <Link className="btn-dark-bg" href={next || "/"}> */}
						{/* 	Next */}
						{/* </Link> */}
						<button type="submit" className="btn-dark-bg">
							{section === APPLICATION_STATES.PICTURES.hash
								? "Upload Images & Continue"
								: section === APPLICATION_STATES.COMPLETE.hash
									? "Submit"
									: "Next"}
						</button>
						{section && (
							<>
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
							</>
						)}
					</div>
				) : (
					loaded && <Link href={"/"}>Return to the homepage</Link>
				)}
			</form>
			<Breadcrumb
				aria-label="Form state breadcrumbs"
				className="mt-auto overflow-x-auto flex-row-reverse"
				id="breadcrumb-nav"
			>
				{breadcrumbs.map((br, i) => {
					const lookup = br.toUpperCase() as Uppercase<Section>;
					const title: string = APPLICATION_STATES[lookup].title || br;
					return (
						<Breadcrumb.Item
							key={br}
							className="cursor-pointer"
							onClick={() => {
								const previous = breadcrumbs[i];
								const newBreadcrumbs = breadcrumbs.slice(0, i);
								dispatch({
									type: "set",
									value: newBreadcrumbs,
									key: "breadcrumbs",
								});
								dispatch({
									type: "set",
									value: previous,
									key: "section",
								});
							}}
						>
							{title}
						</Breadcrumb.Item>
					);
				})}
			</Breadcrumb>
		</>
	);
};

export default CreditApplication;
