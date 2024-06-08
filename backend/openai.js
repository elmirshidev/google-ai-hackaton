import fs from "fs";
import path from "path";
import OpenAI from "openai";
const OPENAI_APIKEY = process.env.OPENAI_APIKEY;
const ORGANIZATION_KEY = process.env.ORGANIZATION_KEY;
const openai = new OpenAI({
    apiKey: OPENAI_APIKEY,
    organization: ORGANIZATION_KEY,
});

const speechFile = path.resolve("./generatedAudios/sound.mp3");

export async function generateAudio(text) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
//   console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
