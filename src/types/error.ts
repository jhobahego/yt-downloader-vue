export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class YouTubeApiError extends Error {
  constructor(message: string, public details?: ApiError) {
    super(message);
    this.name = 'YouTubeApiError';
  }
}