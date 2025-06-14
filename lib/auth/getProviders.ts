import type { Provider } from "@/types";
import { authConfig } from "./config";

export function getProviders(): Provider[] {
	const providerKeys: (keyof Provider)[] = ["id", "name", "type", "style"];
	return authConfig.providers.map((provider) =>
		getKeyValuesFromObject<Provider>(provider, providerKeys),
	);
}

function getKeyValuesFromObject<T>(
	obj: (typeof authConfig)["providers"][number],
	keys: (keyof T)[],
): T {
	return keys.reduce((acc, key) => {
		// @ts-expect-error: this is fine
		if (obj[key]) {
			// @ts-expect-error: this is fine
			acc[key] = obj[key];
		}
		return acc;
	}, {} as T);
}
