"use client";
import {
	APPLICATION_STATES,
	type ApplicationState,
	useFormContext,
} from "@/lib/context";
import type { InputMap, ReadonlyStringArray } from "@/types";
import clsx from "clsx";
import { Checkbox, Datepicker, Label, Radio, TextInput } from "flowbite-react";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { FileInputWrapper } from "./FileInput";

type FormSectionValues<T extends ReadonlyStringArray> = InputMap<T[number]>;
type FormSectionInputs<T extends ReadonlyStringArray> =
	FormSectionValues<T>[keyof FormSectionValues<T>];

export function FormSection<T extends ReadonlyStringArray>({
	inputs,
	hash,
}: {
	inputs: FormSectionInputs<T>;
	hash: ApplicationState;
}) {
	const { dispatch, state, section } = useFormContext();
	const selectedSection = useMemo(() => {
		return APPLICATION_STATES[hash];
	}, [hash]);

	const firstInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		firstInputRef.current?.focus();
	}, [firstInputRef.current]);

	// const isRequired = useMemo(
	// 	() => selectedSection && section === selectedSection.hash,
	// 	[section, selectedSection],
	// );

	const isRequired = false;
	return (
		<>
			{APPLICATION_STATES[hash] && (
				<section className="header pb-4">
					<h2>{APPLICATION_STATES[hash].title || ""}</h2>
					<div>
						{APPLICATION_STATES[hash].introduction || ""}

						{APPLICATION_STATES[hash].component?.()}
					</div>
				</section>
			)}
			<section className="flex flex-col gap-y-2 ">
				{inputs.map((input) => {
					return (
						<section key={input.key} className="form-section">
							{input.key && <h3 className="underline">{input.key}</h3>}
							{input.fields.map(
								({ key, name, text, type, hint, optional, ...radio }) => {
									const ref =
										key === inputs[0]?.fields[0]?.key
											? firstInputRef
											: undefined;

									return (
										<Fragment key={key}>
											{text && type !== "checkbox" && (
												<Label
													htmlFor={key}
													className={clsx("space-x-2", {
														required: optional !== true,
													})}
												>
													<span>{text}</span>
													{hint && (
														<>
															<small>{hint}</small>
														</>
													)}
												</Label>
											)}
											{type === "date" ? (
												<Datepicker
													ref={ref}
													value={state[key] || ""}
													onSelectedDateChanged={(e) => {
														dispatch({
															type: "set",
															key,
															value: e.toISOString().split("T")[0],
														});
													}}
													required={isRequired}
													className="flex-1"
													id={name || key}
													name={name || key}
												/>
											) : type === "checkbox" ? (
												<Label className="space-x-4">
													<Checkbox name={key} required={isRequired} />
													<span>{text}</span>
												</Label>
											) : type === "radio" ? (
												<fieldset className="flex flex-col gap-2">
													<legend>{text}</legend>
													{"options" in radio &&
														radio.options.map((option) => {
															return (
																<Label key={option.key}>
																	<Radio
																		ref={ref}
																		checked={state[key] === option.key}
																		onChange={(e) => {
																			if (e.target.checked) {
																				dispatch({
																					type: "set",
																					key,
																					value: option.key,
																				});
																			}
																		}}
																		required={isRequired}
																	/>
																	{option.value}
																</Label>
															);
														})}
												</fieldset>
											) : type === "file" ? (
												<FileInputWrapper
													title={key}
													accept={"accept" in radio ? radio.accept : "*"}
												/>
											) : (
												<TextInput
													ref={ref}
													min={type === "number" ? 0 : undefined}
													type={type}
													step={"step" in radio ? radio.step : undefined}
													value={state[key] || ""}
													required={isRequired}
													className="flex-1"
													id={name || key}
													name={name || key}
													onChange={(e) => {
														dispatch({
															type: "set",
															key,
															value: e.target.value,
														});
													}}
												/>
											)}
										</Fragment>
									);
								},
							)}
						</section>
					);
				})}
			</section>
		</>
	);
}
