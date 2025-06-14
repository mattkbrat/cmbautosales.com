import { auth } from "@/lib/auth";
import { getProviders } from "@/lib/auth/getProviders";
import { redirect } from "next/navigation";
import { SignInView } from "./SignInView";

export default async function SignIn(props: {
	searchParams: Promise<{ callback?: string }>;
}) {
	const searchParams = await props.searchParams;

	const { callback } = searchParams;

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
	return <SignInView callback={callback} providers={providers} />;
}
