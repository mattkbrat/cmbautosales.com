"use client";

import { useFormContext } from "@/lib/context";
import { APPLICATION_STATES } from "@/lib/context";
import { Label, Radio } from "flowbite-react";
import { useMemo } from "react";

export const FormSelect = () => {
	const { dispatch, state, section } = useFormContext();

	const formSelection = useMemo(() => {
		console.log(state);
		return state.formSelection;
	}, [state]);

	const isRequired = useMemo(
		() => section === APPLICATION_STATES.APPLICABLE_FORM.hash,
		[section],
	);

	return (
		<section className="form-section">
			<fieldset className="contents">
				<legend className="flex flex-1 flex-col ">
					<section className="flex flex-row gap-2  flex-1">
						<h3 className="text-lg">Which form are you filling out?</h3>
					</section>
					<p>You can come back later to fill out a different half.</p>
				</legend>
				<Label>
					<Radio
						checked={formSelection === APPLICATION_STATES.PERSONAL.hash}
						onChange={(e) => {
							if (e.target.checked) {
								dispatch({
									type: "set",
									key: "formSelection",
									value: APPLICATION_STATES.PERSONAL.hash,
								});
							}
						}}
						required={isRequired}
					/>
					Start with Credit Application
				</Label>
				<Label className="form-label">
					<Radio
						checked={formSelection === APPLICATION_STATES.REFERENCE_1.hash}
						onChange={(e) => {
							if (e.target.checked) {
								dispatch({
									type: "set",
									key: "formSelection",
									value: APPLICATION_STATES.REFERENCE_1.hash,
								});
							}
						}}
					/>
					Skip to References
				</Label>
			</fieldset>
		</section>
	);
};
