import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../config/env';

const s3Client = new S3Client({
  region: env.awsRegion,
  // endpoint is only set for local dev (LocalStack); unset in production so the AWS default is used
  ...(env.s3Endpoint
    ? {
        endpoint: env.s3Endpoint,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
        },
      }
    : {}),
});

export async function uploadToS3(key: string, body: Buffer, contentType?: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: env.s3Bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    // SSE-S3 (AES-256) on real AWS; MinIO (dev) rejects the header without KMS configured
    ...(env.s3Endpoint ? {} : { ServerSideEncryption: 'AES256' as const }),
    Metadata: { therapynote: 'true' },
  });
  await s3Client.send(command);
  return key;
}

export async function getS3Url(key: string): Promise<string> {
  // Private bucket: generate a time-limited signed URL
  const command = new GetObjectCommand({
    Bucket: env.s3Bucket,
    Key: key,
  });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}
