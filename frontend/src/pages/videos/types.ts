export interface Video {
  id: string;
  postId: string;
  title: string;
  summary: string;
  facebookLink: string;
  twitterLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse {
  data: Video[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UpdateVideoPayload {
  title?: string;
  summary?: string;
}
