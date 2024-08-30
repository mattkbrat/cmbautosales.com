import { AuthProvider } from "@/lib/context/auth";

export default async function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AuthProvider>{children}</AuthProvider>;
}
