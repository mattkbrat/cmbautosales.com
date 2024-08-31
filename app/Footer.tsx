import { FaExternalLinkAlt } from "react-icons/fa";

export const Footer = () => {
	return (
		<div className="flex flex-col">
			<section
				id="contact"
				className="bg-secondary-800/85 min-h-24 py-2 sm:py-10  w-full flex flex-row flex-wrap px-4 lg:px-10 gap-x-4 align-start justify-around text-xs sm:text-sm lg:text-base"
			>
				<div className="flex-initial w-full border-b-2 pb-4 border-surface-400/25 ">
					<h2 className="text-xl underline">Contact</h2>
					<p>Give us a call or drop on by.</p>
				</div>
				<section
					className="flex flex-col sm:flex-none sm:grid gap-x-4 gap-y-2 grid-cols-[auto,_1fr] flex-none sm:min-w-75"
					id="hours"
				>
					<h3 className="col-span-full font-black underline uppercase text-lg ">
						Hours
					</h3>
					<span className="font-bold">Monday - Friday</span>
					<span>8:00 AM - 5:00 PM</span>
					<span className="font-bold">Saturday</span>
					<span>8:00 AM - 12:00 PM</span>
					<span className="font-bold">Sundays, Holy Days</span>
					<span>Closed</span>
				</section>
				<div className="flex flex-col md:contents">
					<section className="flex-none flex-col flex min-w-32 gap-y-2">
						<h3 className="col-span-full font-black underline uppercase text-lg">
							Address
						</h3>
						<p>
							16333 County Road V<br />
							Fort Morgan, CO 80701
						</p>
					</section>
					<section className="flex-none flex-col flex gap-y-2">
						<h3 className="col-span-full font-black underline uppercase text-lg">
							Phone
						</h3>
						<a href="tel:+9708676156">(970) 867-6156</a>
					</section>
				</div>
			</section>
			<footer className="bg-primary-800 h-max text-sm py-2 justify-around flex flex-col md:flex-row px-10 gap-y-2 w-full">
				<p>© CMB AUTO SALES</p>
				<a
					href="https://mattkbrat.com"
					target="_blank"
					rel="noreferrer"
					className="flex flex-row gap-2 text-xs"
				>
					<span>Designed and Created by Matthew Bratrsovsky</span>
					<FaExternalLinkAlt />
				</a>
			</footer>
		</div>
	);
};
