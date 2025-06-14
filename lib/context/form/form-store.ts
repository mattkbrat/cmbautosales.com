import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Section, sections } from "./credit-application";
import type { FormKey } from "./sections";

type State = { [key in FormKey]?: string };
export type ImageProofData = { file: File; key: string };
type FormState = {
	breadcrumbs: Section[];
	section: Section;
	id: number | null;
	images: ImageProofData[];
	state: State;
	dispatch: (state: Partial<State>) => void;
	setBreadcrumbs: (breadcrumbs?: Section[]) => void;
	setSection: (section: Section) => void;
	setId: (id: number) => void;
	setImages: (file: File, key: string) => void;
	removeImage: (index: number) => void;
	resetImages: () => void;
	clear: () => void;
	getNext: () => null | Section;
	getSelected: () => null | number;
};

export const useFormStore = create<FormState>()(
	persist(
		(set, get) => ({
			breadcrumbs: ["introduction"],
			section: "introduction",
			id: null,
			setId: (id) => set({ id }),
			images: [],
			dispatch: (state) => set({ state }),
			state: {},
			clear: () => {
				set({
					breadcrumbs: ["introduction"],
					section: "introduction",
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
			setBreadcrumbs: (b) => {
				if (b) {
					set({ breadcrumbs: b });
					return;
				}

				const { breadcrumbs: curr, section } = get();

				const breadcrumbs = b ?? curr;

				const sectionIndex = breadcrumbs.indexOf(section);
				const newBreadcrumbs = [...breadcrumbs];
				if (sectionIndex !== -1) {
					newBreadcrumbs.splice(sectionIndex, 1);
				}
				newBreadcrumbs.push(section);
				if (newBreadcrumbs.slice(-1)[0] === breadcrumbs.slice(-1)[0]) {
					return;
				}
				set({ breadcrumbs: newBreadcrumbs });
			},
			getSelected: () => {
				const { section } = get();
				return sections.indexOf(section);
			},
			// getNext: () => {

			//   const selected = get().getSelected();
			//   if (!selected) return true;
			//   return applicationRouteData[selected].next;
			// },
			getNext: () => {
				const { section } = get();
				const index = sections.indexOf(section);
				if (index === -1) return "introduction";
				if (index === sections.length) return "complete";
				return sections[index + 1];
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
