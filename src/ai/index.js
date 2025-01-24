import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";

const genAI = new GoogleGenerativeAI("AIzaSyBqGXa0xgwSnuoctYSCTxLL-umhoQyTpz4");

async function remotePdfToPart(path, displayName) {
  const fileManager = new GoogleAIFileManager(
    "AIzaSyBqGXa0xgwSnuoctYSCTxLL-umhoQyTpz4"
  );
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType: "application/pdf",
    displayName,
  });

  return {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  };
}

async function summarizePdf() {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
  const result = await model.generateContent([
    await remotePdfToPart("./m4.pdf", "notes"),
    await remotePdfToPart("./pyq.pdf", "pyqs"),
    "The given documents are pdf file of notes and pyqs of an engineering student. Find me the relative topics and its page number from the notes for the questions in the pyqs file.",
  ]);
  console.log(result.response.text());

  // const result = await model.generateContent([
  //   {
  //     fileData: {
  //       fileUri: uploadResult.file.uri,
  //       mimeType: uploadResult.file.mimeType,
  //     },
  //   },
  //   // "The givem document is a pdf file of a notes of a engineering student. The handwritten notes is has multiple pages and huge content in it , summarise the content of the pdf for each and everytopic, summary should contain all the points and the subpoints present in the pdf file",
  //   "The given document is a pdf file of notes of an engineering student. The handwritten notes have multiple pages and huge content in it. List out the headings of each topic and subtopics and even list the page numbers in which they are present present in the pdf file. ",
  // ]);
}

async function generateEmbedding(summary) {
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  const result = await model.embedContent(summary);
  const embedding = result.embedding;
  return embedding.values;
}

summarizePdf();
