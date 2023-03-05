import { S3 } from '@aws-sdk/client-s3';

export const S3Client = new S3({
  endpoint: process.env.DIGITALOCEAN_SPACE_ENDPOINT,
  region: process.env.DIGITALOCEAN_SPACE_REGION,
  credentials: {
    accessKeyId: String(process.env.DIGITALOCEAN_SPACE_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.DIGITALOCEAN_SPACE_SECRET_ACCESS_KEY),
  },
});
