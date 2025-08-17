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

export async function callUploadChatWithTxt(
  file: File
): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/chat-with-txt/upload`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
