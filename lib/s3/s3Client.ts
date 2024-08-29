import { env } from "../env";

const {
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_ENDPOINT: ENDPOINT,
} = env;
import { S3Client as Client } from "@aws-sdk/client-s3";
export const s3Client = new Client({
	region: "auto",
	endpoint: ENDPOINT,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});
