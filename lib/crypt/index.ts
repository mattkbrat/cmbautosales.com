import Cryptr from "cryptr";
import { env } from "../env";
const cryptr = new Cryptr(env.CRYPT_SECRET);

export const encrypt = (arg1: string) => cryptr.encrypt(arg1);
export const decryptString = (arg1: string) => cryptr.decrypt(arg1);
