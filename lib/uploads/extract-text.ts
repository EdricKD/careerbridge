import mammoth from "mammoth";
import pdfParse from "pdf-parse";

export async function extractResumeText(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    const result = await pdfParse(buffer);
    return result.text.trim();
  }

  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  return "";
}
