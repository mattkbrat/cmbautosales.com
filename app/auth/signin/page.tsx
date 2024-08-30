import { SignInView } from "./SignInView";
import { redirect } from "next/navigation";
import { auth, getServerSession } from "@/lib/auth";
import { getProviders } from "@/lib/auth/getProviders";

export default async function SignIn() {
	const session = await auth();

	if (session) {
		redirect("/");
	}

	const providers = getProviders();

	if (providers === null) {
		console.error("No providers");
		redirect("/");
	}

	console.log(providers);
	return <SignInView providers={providers} />;
}
