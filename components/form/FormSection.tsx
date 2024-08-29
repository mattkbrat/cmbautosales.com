"use client";
import {
	APPLICATION_STATES,
	type ApplicationState,
	useFormContext,
} from "@/lib/context";
import type { InputMap, InputMapParams } from "@/types";
import clsx from "clsx";
import { Checkbox, Datepicker, Label, Radio, TextInput } from "flowbite-react";
import { Fragment, useEffect, useRef } from "react";
import { FileInputWrapper } from "./FileInput";
import type { FormKey } from "@/lib/context/form/sections";

export function FormSection<T extends InputMapParams>({
	inputs,
	hash,
}: {
	inputs: InputMap<T>[keyof InputMap<T>];
	hash: ApplicationState;
}) {
	const { dispatch, state } = useFormContext();

	const firstInputRef = useRef<HTMLLabelElement>(null);

	useEffect(() => {
		firstInputRef.current?.addEventListener("change", () => {
			firstInputRef.current?.focus();
		});
	}, []);

	const isDev = process.env.NODE_ENV === "development";

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
									const isRequired = optional !== true && !isDev;
									return (
										<Fragment key={key}>
											{text && type !== "checkbox" && (
												<Label
													htmlFor={key || ""}
													ref={firstInputRef}
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
													value={state[key as FormKey]?.toString() || ""}
													onSelectedDateChanged={(e) => {
														dispatch({
															type: "set",
															key: key as FormKey,
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
																		checked={
																			state[key as FormKey] === option.key
																		}
																		onChange={(e) => {
																			if (e.target.checked) {
																				dispatch({
																					type: "set",
																					key: key as FormKey,
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
													min={type === "number" ? 0 : undefined}
													type={type}
													step={"step" in radio ? radio.step : undefined}
													value={state[key as FormKey]?.toString() || ""}
													required={isRequired}
													className="flex-1"
													id={name || key}
													name={name || key}
													onChange={(e) => {
														dispatch({
															type: "set",
															key: key as FormKey,
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
