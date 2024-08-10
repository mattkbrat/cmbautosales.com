"use client";

import { FaExternalLinkAlt, FaPhoneAlt } from "react-icons/fa";

export default function Home() {
	return (
		<main className="flex lg:flex-row flex-col relative overflow-x-clip min-h-screen ">
			<div className="flex flex-col text-white flex-1">
				<section className="sm:h-screen flex-1 sm:flex-none gap-y-4 w-full justify-center flex flex-col sm:px-10 sm:py-4 px-4 py-2">
					<div className="gap-y-2 flex flex-col">
						<h1 className="text-5xl font-black">CMB AUTO SALES</h1>
						<p className="font-bold text-xl">
							Auto Dealership, Family Owned Since 1946
						</p>
					</div>
					<a
						className="rounded-full p-4 bg-primary-200 w-max font-bold shadow-primary-50 shadow-sm hover:bg-primary-300 outline-primary-50 outline-4 transition-colors "
						href="https://docs.google.com/forms/d/e/1FAIpQLSf3zQ7v5da7NYgnnPBfGzkIGbLJZdwnA5YbInfdDgm3zNWOYQ/viewform"
						target="_blank"
						rel="noreferrer"
					>
						<span className="text-surface-900 uppercase flex flex-row gap-2">
							<span>Submit A Credit Application</span>
							<FaExternalLinkAlt />
						</span>
					</a>
					<div className="flex sm:contents gap-x-2 gap-y-4 flex-wrap">
						<a
							className="rounded-full p-4 bg-success-200/5 w-max font-bold shadow-primary-50 shadow-sm hover:bg-surface-900 outline-primary-50 outline-4 transition-colors border-2 border-success-200"
							href="https://square.link/u/dPNrXDA7"
							target="_blank"
							rel="noreferrer"
						>
							<span className="text-surface-100 uppercase flex flex-row gap-2">
								<span>Make monthly payments</span>
								<FaExternalLinkAlt />
							</span>
						</a>
						<a
							className="rounded-full p-4 bg-success-200/5 w-max font-bold shadow-primary-50 shadow-sm hover:bg-surface-900 outline-primary-50 outline-4 transition-colors border-2 border-success-200"
							href="https://square.link/u/ygsBffh1"
							target="_blank"
							rel="noreferrer"
						>
							<span className="text-surface-100 uppercase flex flex-row gap-2">
								<span>Make a Payment</span>
								<FaExternalLinkAlt />
							</span>
						</a>
						<a
							className="rounded-full p-4 w-max font-bold shadow-primary-50 shadow-sm hover:bg-surface-900 outline-primary-50 border-2 transition-colors "
							href="tel:+9708676156"
						>
							<span className="text-surface-100 uppercase flex flex-row gap-2">
								<span>Contact Us</span>
								<FaPhoneAlt />
							</span>
						</a>
					</div>
				</section>
			</div>
		</main>
	);
}
