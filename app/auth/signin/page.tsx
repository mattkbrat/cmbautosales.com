import { SignInView } from "./SignInView";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { getProviders } from "next-auth/react";

export default async function SignIn() {
	const session = await getServerSession();

	if (session) {
		redirect("/");
	}

	const providers = await getProviders();

	if (providers === null) {
		console.error("No providers");
		redirect("/");
	}

	return <SignInView providers={providers} />;
}
