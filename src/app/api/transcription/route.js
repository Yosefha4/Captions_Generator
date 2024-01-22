import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommand,
  TranscribeClient,
} from "@aws-sdk/client-transcribe";

function getClient() {
  return new TranscribeClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}
function createTransCommand(file_name) {
  return new StartTranscriptionJobCommand({
    TranscriptionJobName: file_name,
    OutputBucketName: process.env.BUCKET_NAME,
    OutputKey: file_name + ".transcription",
    IdentifyLanguage: true,
    Media: {
      MediaFileUri: "s3://" + process.env.BUCKET_NAME + "/" + file_name,
    },
  });
}

async function createTransJob(file_name) {
  const transcribeClient = getClient();
  const tanscribeCommand = createTransCommand(file_name);
  return transcribeClient.send(tanscribeCommand);
}

async function getJob(file_name) {
  const transcribeClient = getClient();

  let statusResult = null;
  try {
    const jobStatusCommand = new GetTranscriptionJobCommand({
      TranscriptionJobName: file_name,
    });

    statusResult = await transcribeClient.send(jobStatusCommand);
  } catch (error) {}
  return statusResult;
}

async function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", reject);
  });
}

async function getTranscriptionBy(file_name) {
  const transFileName = file_name + ".transcription";

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: transFileName,
  });

  let transcriptionResponse = null;

  try {
    transcriptionResponse = await client.send(getObjectCommand);
  } catch (error) {}

  if (transcriptionResponse) {
    return JSON.parse(await streamToString(transcriptionResponse.Body));
  }
  return null;
}

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const file_name = searchParams.get("filename");

  //find ready transcription
 const transcription =  await getTranscriptionBy(file_name);
 if(transcription){
    return Response.json({
        status:'COMPLETED',
        transcription
    })
 }

  //check if already transcribing
  const existingJob = await getJob(file_name);

  if (existingJob) {
    return Response.json({
      status: existingJob.TranscriptionJob.TranscriptionJobStatus,
    });
  }

  //creating new trans job
  if (!existingJob) {
    const newJob = await createTransJob(file_name);
    return Response.json({
      status: newJob.TranscriptionJob.TranscriptionJobStatus,
    });
  }

  return Response.json(null);
}
