import { getServerSession } from "@/lib/auth";
import { AuthProvider } from "@/lib/context/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	if (!session) return redirect("/auth/signin");

	return <AuthProvider>{children}</AuthProvider>;
}
