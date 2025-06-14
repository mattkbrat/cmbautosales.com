import type { ArrayElement } from "@/types";

export const sections = [
	"introduction",
	"applicable_form",
	"personal",
	"employment",
	"housing",
	"references",
	"pictures",
	"complete",
	"submit",
] as const;

export type Section = ArrayElement<typeof sections>;
