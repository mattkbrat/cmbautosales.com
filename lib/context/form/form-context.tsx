"use client";
import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
	type Dispatch,
	type ReactNode,
} from "react";

import rss from "react-secure-storage";
import { APPLICATION_STATES, type ApplicationHash } from "./credit-application";
import type { FormKey } from "./sections";
import { ArrayElement } from "@/types";

type FormImageAction =
	| {
			type: "set";
			image: File;
	  }
	| {
			type: "remove";
			index: number;
	  }
	| {
			type: "reset";
	  }
	| {
			type: "submit";
	  };
export type FormContextType = {
	section: string;
	state: FormData;
	dispatch: Dispatch<FormInputAction>;
	clearForm: () => void;
	loaded: boolean;
	breadcrumbs: string[];
	images: {
		current: File[];
		dispatch: Dispatch<FormImageAction>;
	};
};

const Context = createContext<FormContextType>({
	section: "",
	state: {},
	loaded: false,
	dispatch: () => {},
	clearForm: () => {},
	breadcrumbs: [],
	images: {
		current: [],
		dispatch: () => {},
	},
});

export const useFormContext = () => useContext(Context);

type FormData = Partial<{ [key in FormKey]: string | number | Date }>;

type FormInputAction =
	| {
			type: "set";
			key: FormKey;
			value: unknown;
	  }
	| {
			type: "reset";
	  };

function formReducer(state: FormData, action: FormInputAction): FormData {
	if (action.type === "set") {
		return {
			...state,
			[action.key]: action.value || undefined,
		} as FormData;
	}
	if (action.type === "reset") {
		return {};
	}

	return state;
}

function imageReducer(images: File[], action: FormImageAction) {
	if (action.type === "set") {
		const currentIndex = images.findIndex((i) => i.name === action.image.name);
		if (currentIndex !== -1) {
			images[currentIndex] = action.image;
		} else {
			images.push(action.image);
		}

		return images;
	}
	if (action.type === "remove") {
		images.splice(action.index, 1);
		return images;
	}
	if (action.type === "reset") {
		return [];
	}

	if (action.type === "submit") {
		return images;
	}

	return images;
}

export const FormProvider = (p: {
	children: ReactNode;
	form: string;
}) => {
	const [loaded, setLoaded] = useState(false);

	const keys = useMemo(() => {
		return {
			section: `${p.form}-section`,
			data: `${p.form}-data`,
			breadcrumbs: `${p.form}-nav`,
		};
	}, [p.form]);

	const lastSection = useMemo(() => {
		const set = rss.getItem(keys.section);
		if (typeof set === "string") return set;
		return APPLICATION_STATES.INTRODUCTION.hash;
	}, [keys.section]);

	const [formState, dispatchFormState] = useReducer(formReducer, {});
	const [images, dispatchImages] = useReducer(imageReducer, []);

	const section = useMemo(() => {
		return typeof formState.section === "string"
			? formState.section
			: lastSection || "";
	}, [formState.section, lastSection]);

	const breadcrumbs: ApplicationHash[] = useMemo(() => {
		const stateSet = formState.breadcrumbs;
		if (Array.isArray(stateSet)) return stateSet;
		const set = rss.getItem(keys.breadcrumbs);
		if (Array.isArray(set)) return set;
		return [APPLICATION_STATES.INTRODUCTION.hash];
	}, [keys.breadcrumbs, formState.breadcrumbs]);

	useEffect(() => {
		const sectionTyped = section as ApplicationHash;
		const sectionIndex = breadcrumbs.indexOf(sectionTyped);
		const newBreadcrumbs = [...breadcrumbs];
		if (sectionIndex !== -1) {
			newBreadcrumbs.splice(sectionIndex, 1);
		}
		newBreadcrumbs.push(sectionTyped);
		if (newBreadcrumbs.slice(-1)[0] === breadcrumbs.slice(-1)[0]) {
			return;
		}
		dispatchFormState({
			type: "set",
			value: newBreadcrumbs,
			key: "breadcrumbs",
		});
	}, [section, breadcrumbs]);

	useEffect(() => {
		const exists = rss.getItem(keys.data);
		if (!exists || !(exists instanceof Object)) {
			setLoaded(true);
			return;
		}

		for (const [k, v] of Object.entries(exists)) {
			dispatchFormState({ type: "set", key: k as keyof FormData, value: v });
		}

		setTimeout(() => {
			setLoaded(true);
		}, 200);
	}, [keys.data]);

	useEffect(() => {
		if (!loaded) return;
		rss.setItem(keys.data, formState);
	}, [formState, loaded, keys.data]);

	const clearForm = () => {
		rss.setItem(keys.data, {});
		rss.setItem(keys.section, "");
		rss.setItem(keys.breadcrumbs, [APPLICATION_STATES.INTRODUCTION.hash]);
		dispatchFormState({ type: "reset" });
		dispatchImages({ type: "reset" });
	};

	return (
		<Context.Provider
			value={{
				section,
				state: formState,
				dispatch: dispatchFormState,
				clearForm,
				loaded,
				breadcrumbs,
				images: {
					current: images,
					dispatch: dispatchImages,
				},
			}}
		>
			{p.children}
		</Context.Provider>
	);
};
