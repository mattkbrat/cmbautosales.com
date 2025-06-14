import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/auth";
import clsx from "clsx";
import { Suspense } from "react";
import { Footer } from "./Footer";
import { HeaderNav } from "./HeaderNav";

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
		<html lang="en" suppressHydrationWarning>
			<body
				className={clsx(
					inter.className,
					"flex min-h-screen lg:flex-row flex-col relative overflow-x-clip",
				)}
			>
				<AuthProvider>
					<Suspense>
						<HeaderNav />
					</Suspense>
					<div className="flex-1 min-h-screen flex flex-col">
						<div className="flex flex-col flex-1 ">{children}</div>
						<Footer />
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
