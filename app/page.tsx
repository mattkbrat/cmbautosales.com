"use client";

import Link from "next/link";
import { FaExternalLinkAlt, FaPhoneAlt } from "react-icons/fa";

export default function Home() {
	return (
		<main className="flex lg:flex-row flex-col relative overflow-x-clip min-h-screen ">
			<div className="flex flex-col flex-1">
				<section className="sm:h-screen flex-1 sm:flex-none gap-y-4 w-full justify-center flex flex-col sm:px-10 sm:py-4 px-4 py-2">
					<div className="gap-y-2 flex flex-col">
						<h1 className="text-5xl font-black">CMB AUTO SALES</h1>
						<p className="font-bold text-xl">
							Auto Dealership, Family Owned Since 1946
						</p>
					</div>
					<Link href="/credit-application" rel="noreferrer">
						<span className="text-white uppercase flex flex-row gap-2 rounded-full p-4 bg-blue-800 w-max font-bold shadow-blue-5000 shadow-sm hover:bg-blue-300 outline-blue-500 outline-4 transition-colors">
							Submit A Credit Application
						</span>
					</Link>
					<div className="flex sm:contents gap-x-2 gap-y-4 flex-wrap">
						<a
							className="rounded-full p-4 bg-green-200/5 w-max font-bold shadow-green-500 shadow-sm hover:bg-black-900 outline-green-500 outline-4 transition-colors border-2 border-green-200"
							href="https://square.link/u/dPNrXDA7"
							target="_blank"
							rel="noreferrer"
						>
							<span className="text-black-100 uppercase flex flex-row gap-2">
								<span>Make monthly payments</span>
								<FaExternalLinkAlt />
							</span>
						</a>
						<a
							className="rounded-full p-4 bg-green-200/5 w-max font-bold shadow-green-500 shadow-sm hover:bg-black-900 outline-green-500 outline-4 transition-colors border-2 border-green-200"
							href="https://square.link/u/ygsBffh1"
							target="_blank"
							rel="noreferrer"
						>
							<span className="text-black-100 uppercase flex flex-row gap-2">
								<span>Make a Payment</span>
								<FaExternalLinkAlt />
							</span>
						</a>
						<a
							className="rounded-full p-4 w-max font-bold shadow-blue-500 shadow-sm hover:bg-black-900 outline-blue-500 border-2 transition-colors "
							href="tel:+19708676156"
						>
							<span className="text-black-100 uppercase flex flex-row gap-2">
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
