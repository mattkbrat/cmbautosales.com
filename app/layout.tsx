import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderNav } from "./HeaderNav";
import clsx from "clsx";
import { Footer } from "./Footer";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CMB Auto Sales",
	description: "Auto Dealership, Family Owned Since 1946",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={clsx(
					inter.className,
					"flex min-h-screen lg:flex-row flex-col relative overflow-x-clip",
				)}
			>
				<Suspense>
					<HeaderNav />
				</Suspense>
				<div className="flex-1 min-h-screen flex flex-col">
					<div className="flex flex-col bg-primary-800 flex-1 ">{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
