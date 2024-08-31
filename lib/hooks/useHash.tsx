"use client";

import { useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";

export const useHash = () => {
	const searchParams = useSearchParams();
	const [hash, setHash] = useState("");
	const oldHash = useDeferredValue(hash);

	// biome-ignore lint/correctness/useExhaustiveDependencies: We need to intercept the listener event for the hash change
	useEffect(() => {
		if (typeof window === "undefined") return;
		const hash = window.location.hash.slice(1);
		hash !== oldHash && setHash(hash);
	}, [searchParams]);

	return { hash };
};
