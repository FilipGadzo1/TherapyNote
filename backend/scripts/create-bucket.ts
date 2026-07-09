// One-time dev setup: creates the audio bucket in MinIO (docker-compose).
// Run with: npx tsx scripts/create-bucket.ts
import 'dotenv/config';
import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

client
  .send(new CreateBucketCommand({ Bucket: process.env.S3_BUCKET || 'therapynote-dev-audio' }))
  .then(() => console.log('Bucket created'))
  .catch((e) => {
    if (e.name === 'BucketAlreadyOwnedByYou') console.log('Bucket already exists');
    else throw e;
  });
