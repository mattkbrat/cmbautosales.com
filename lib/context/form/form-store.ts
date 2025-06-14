import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	APPLICATION_STATES,
	type ApplicationHash,
	applicationRouteData,
} from "./credit-application";
import type { FormKey } from "./sections";

type State = { [key in FormKey]?: string };
type FormState = {
	breadcrumbs: ApplicationHash[];
	section: string;
	id: number | null;
	images: { file: File; key: string }[];
	state: State;
	dispatch: (state: Partial<State>) => void;
	setBreadcrumbs: (breadcrumbs?: ApplicationHash[]) => void;
	setSection: (section: string) => void;
	setId: (id: number) => void;
	setImages: (file: File, key: string) => void;
	removeImage: (index: number) => void;
	resetImages: () => void;
	clear: () => void;
	getNext: () => null | string;
	getSelected: () => null | number;
};

export const useFormStore = create<FormState>()(
	persist(
		(set, get) => ({
			breadcrumbs: [APPLICATION_STATES?.INTRODUCTION?.hash],
			section: APPLICATION_STATES?.INTRODUCTION?.hash,
			id: null,
			setId: (id) => set({ id }),
			images: [],
			dispatch: (state) => set({ state }),
			state: {
				formSelection: "",
				housingOrRenting: "housing",
			},
			clear: () => {
				set({
					breadcrumbs: [APPLICATION_STATES.INTRODUCTION.hash],
					section: APPLICATION_STATES.INTRODUCTION.hash,
					images: [],
				});
			},
			setImages: (file, key) => {
				const newImages = [...get().images];
				const index = newImages.findIndex((i) => i.key === key);
				if (index !== -1) {
					newImages[index].file = file;

					return;
				}
				newImages.push({ key, file });
				set({ images: newImages });
			},
			removeImage: (i) => {
				const newImages = [...get().images];
				newImages.splice(i, 1);
				set({ images: newImages });
			},
			resetImages: () => set({ images: [] }),
			setBreadcrumbs: (b?: ApplicationHash[]) => {
				if (b) {
					set({ breadcrumbs: b });
					return;
				}

				const { breadcrumbs: curr, section } = get();

				const breadcrumbs = b ?? curr;

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
				set({ breadcrumbs: newBreadcrumbs });
			},
			getSelected: () => {
				const { section } = get();
				const curr = applicationRouteData.findIndex((r) => r.hash === section);
				if (curr === -1) {
					return null;
				}

				return curr;
			},
			// getNext: () => {

			//   const selected = get().getSelected();
			//   if (!selected) return true;
			//   return applicationRouteData[selected].next;
			// },
			getNext: () => {
				const { getSelected, state, section } = get();
				const selected = getSelected();
				if (selected === null) return null;
				const next = applicationRouteData[selected]?.next;
				if (applicationRouteData[selected].next) {
					return next ?? "";
				}
				if (section === APPLICATION_STATES.APPLICABLE_FORM.hash) {
					return state.formSelection ?? "";
				}

				if (section === APPLICATION_STATES.HOUSINGORRENTING.hash) {
					return state.housingOrRenting ?? "";
				}

				return (
					applicationRouteData[selected + 1]?.hash ??
					APPLICATION_STATES.APPLICABLE_FORM.hash ??
					""
				);
			},

			setSection: (s) => {
				set({ section: s });
				get().setBreadcrumbs();
			},
		}),
		{
			name: "form-storage",
		},
	),
);
