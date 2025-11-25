export interface UploadResponse {
  filename: string;
  total_chunks_created: number;
  successful_uploads: number;
  failed_uploads: number;
  namespace: string;
  file_size_bytes: number;
  success: boolean;
  error?: string;
}

export async function callUploadTextKnowledgeForAiSchool(
  file: File
): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/ai-school-agent/upload-text-single`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
