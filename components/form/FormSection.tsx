"use client";
import {
	APPLICATION_STATES,
	type ApplicationState,
} from "@/lib/context";
import type { InputMap, InputMapParams } from "@/types";
import clsx from "clsx";
import { Fragment, useEffect } from "react";
import { FileInputWrapper } from "./FileInput";
import type { FormKey } from "@/lib/context/form/sections";
import { useFormStore } from "@/lib/context/form/form-store";
import { Introduction } from "../credit-application";

export function FormSection<T extends InputMapParams>({
	inputs,
	hash,
}: {
	inputs: InputMap<T>[keyof InputMap<T>];
	hash: ApplicationState;
}) {
	const { dispatch, state } = useFormStore();

	useEffect(() => {
		if (!Array.isArray(inputs) || inputs.length === 0) return;
		const firstTag = `${inputs[0].fields[0].name || inputs[0].fields[0].key}`;
		const element = document.getElementById(firstTag);
		if (!element) return;
		element.focus();
	}, [inputs]);

	const isDev = process.env.NODE_ENV === "development";

	return (
		<>
			{APPLICATION_STATES[hash] && (
				<section className="bg-surface p-4 rounded-lg">
					<h2 className="underline text-lg font-bold">{APPLICATION_STATES[hash].title || ""}</h2>
					<div>
						{APPLICATION_STATES[hash].introduction || ""}

            <Introduction/>
					</div>
				</section>
			)}
			<section className="flex flex-col gap-y-2 ">
				{inputs.map((input) => {
					return (
						<fieldset key={input.key} className="form-section ">
							{input.key && <legend className="underline">{input.key}</legend>}
							{input.fields.map(
								({ key, name, text, type, hint, optional, ...radio }) => {
									const isRequired = optional !== true && !isDev;
									return (
										<Fragment key={key}>
											{text && type !== "checkbox" && (
												<label
													htmlFor={key || ""}
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
												</label>
											)}
											{type === "date" ? (
												<input type="date"
													value={(new Date(state[key as FormKey] ?? new Date())).toISOString().split("T")[0]}
													onChange={(e) => {
															dispatch({
                                [key]: e.target.value 
															})
													}}
													required={isRequired}
													className="flex-1"
													id={name || key}
													name={name || key}
												/>
											) : type === "checkbox" ? (
												<label className="space-x-4">
													<input type="checkbox" name={key} required={isRequired} />
													<span>{text}</span>
												</label>
											) : type === "radio" ? (
												<fieldset className="flex flex-col gap-2">
													<legend>{text}</legend>
													{"options" in radio &&
														radio.options.map((option) => {
															return (
																<label key={option.key} className="space-x-2 text-base">
																	<input type="radio"
																		checked={
																			state[key as FormKey] === option.key
																		}
																		onChange={(e) => {
																			if (e.target.checked) {
																				dispatch({
                                          [key]: option.key
																				});
																			}
																		}}
																		required={isRequired}
																	/>
																	<span>{option.value}</span>
																</label>
															);
														})}
												</fieldset>
											) : type === "file" ? (
												<FileInputWrapper
													title={key}
													accept={"accept" in radio ? radio.accept : "*"}
												/>
											) : (
												<input
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
                                      [key]: e.target.value
														});
													}}
												/>
											)}
										</Fragment>
									);
								},
							)}
						</fieldset>
					);
				})}
			</section>
		</>
	);
}
