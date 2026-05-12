import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET ?? "cabane135-media";
const publicUrl = process.env.R2_PUBLIC_URL ?? "";

let s3: S3Client | null = null;
function client() {
  if (s3) return s3;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 credentials are not configured");
  }
  s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return s3;
}

export async function getUploadUrl(key: string, contentType: string) {
  const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
  return getSignedUrl(client(), cmd, { expiresIn: 60 * 5 });
}

export function getPublicUrl(key: string) {
  return `${publicUrl.replace(/\/$/, "")}/${key}`;
}

export async function deleteObject(key: string) {
  const cmd = new DeleteObjectCommand({ Bucket: bucket, Key: key });
  await client().send(cmd);
}
