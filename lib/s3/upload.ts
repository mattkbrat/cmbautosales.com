import { s3Client } from ".";
import {
	PutObjectCommand,
	type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { env } from "../env";

const bucketName = env.CREDIT_APPLICATIONS_BUCKET;

export const upload = async ({
	bucket = bucketName,
	filename,
	file,
	contentType,
}: {
	bucket?: string;
	filename: string;
	file: PutObjectCommandInput["Body"];
	contentType?: PutObjectCommandInput["ContentType"];
}) => {
	console.log(bucketName);

	const putObjectInput: PutObjectCommandInput = {
		Body: file,
		Bucket: bucket,
		Key: filename,
		ContentDisposition: `inline; filename="${filename}"`,
		ContentType: contentType,
	};

	const command = new PutObjectCommand(putObjectInput);

	return s3Client.send(command).then((r) => {
		return {
			r: r.$metadata,
			bucket: bucketName,
		};
	});
};
