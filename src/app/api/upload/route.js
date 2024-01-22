import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  const { name, type } = file;
  const data = await file.arrayBuffer();

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const id = uniqid();
  const exten = name.split(".").slice(-1);
  const newName = id + "." + exten;

  const upCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Body: data,
    ACL: "public-read",
    ContentType: type,
    Key: newName,
  });

  await client.send(upCommand);

  return Response.json({ name, exten, newName,id });
}
