import type { Provider } from "@/types";
import { authConfig } from "./config";

export function getProviders(): Provider[] {
	const providerKeys: (keyof Provider)[] = ["id", "name", "type", "style"];
	return authConfig.providers.map((provider) =>
		getKeyValuesFromObject<Provider>(provider, providerKeys),
	);
}

function getKeyValuesFromObject<T>(obj: any, keys: (keyof T)[]): T {
	return keys.reduce((acc, key) => {
		if (obj[key]) {
			acc[key] = obj[key];
		}
		return acc;
	}, {} as T);
}
