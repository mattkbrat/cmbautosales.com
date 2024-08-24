"use client";

export const Introduction = () => {
	return (
		<>
			<p>
				Before you continue this form, please be aware that you will need the
				following information:
			</p>
			<ul className="list-disc ml-4">
				<li>
					Personal
					<ul>
						<li>- SSN </li>
						<li>- Driver's License</li>
					</ul>
				</li>
				<li>
					Employment
					<ul>
						<li>- Monthly income</li>
						<li>- Length of employment</li>
						<li>- Job description</li>
						<li>- Address</li>
					</ul>
				</li>
				<li>
					4+ Personal References, each with:
					<ul>
						<li>- Name</li>
						<li>- Address</li>
						<li>- Phone Number (Personal/Home & Work)</li>
					</ul>
				</li>
				<li>
					Pictures
					<ul>
						<li>- Pay Stub</li>
						<li>- Driver's License</li>
						<li>
							- Proof of Residency, which must include proof of a current
							address, valid within the last month.
						</li>
					</ul>
				</li>
			</ul>
			<p>
				Expect to spend 10-20 minutes on this form. Contact us for a paper copy.
				<br />
				<small>
					The data that you enter into each field is automatically saved. Upon
					form completion, the data will be erased from your browser.
					<br />
					Please note that this information is saved locally. It is not
					available on other devices.
					<br />
					The method used to save this information is secure.
				</small>
				<br />
				<br />
				<b>Ensure you hit SUBMIT at the end of the form</b>
			</p>
		</>
	);
};
