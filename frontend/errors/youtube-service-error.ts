export type YouTubeServiceErrorCode =
   | "VIDEO_ID_REQUIRED"
   | "INVALID_VIDEO_ID"
   | "NOT_FOUND"
   | "NO_TRANSCRIPT"
   | "EMPTY_TRANSCRIPT"
   | "RATE_LIMIT"
   | "QUOTA_EXCEEDED"
   | "UNAUTHORIZED"
   | "TIMEOUT"
   | "SERVICE_UNAVAILABLE"
   | "UNKNOWN_ERROR";

export class YouTubeServiceError extends Error {
   public code: YouTubeServiceErrorCode;
   public status?: number | undefined;

   constructor(
      code: YouTubeServiceErrorCode,
      message: string,
      status?: number,
   ) {
      super(message);
      this.name = "YouTubeServiceError";
      this.code = code;
      this.status = status;
   }
}
