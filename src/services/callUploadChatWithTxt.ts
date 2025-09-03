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
    // Validate file type before uploading
    const validExtensions = [".txt", ".md"];
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));

    if (!validExtensions.includes(fileExtension)) {
      throw new Error(
        `Unsupported file type: ${fileExtension}. Only .txt and .md files are supported.`
      );
    }

    const formData = new FormData();
    formData.append("files", file);

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_AI_API_URL}/api/reranking-with-llm/upload`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!resp.ok) {
      let errorMessage = `HTTP error! status: ${resp.status}`;
      try {
        const errorData = await resp.json();
        errorMessage =
          errorData.detail ||
          errorData.message ||
          errorData.error ||
          errorMessage;
      } catch (parseError) {
        // If we can't parse the error response, use the status text
        errorMessage = resp.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    // Ensure we always throw a proper Error object with a message
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Upload failed: ${String(error)}`);
    }
  }
}
