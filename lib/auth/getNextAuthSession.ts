import { auth } from "./auth";
import { authConfig } from "./config";

export const getServerSession = async () => {
	return auth(authConfig);
};
