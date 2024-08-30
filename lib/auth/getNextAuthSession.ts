import { getServerSession as getSs } from "next-auth";
import { options } from "./authOptions";

export const getServerSession = async () => {
	// @ts-expect-error: TODO: Debug why these types are broken.
	return getSs(options);
};
