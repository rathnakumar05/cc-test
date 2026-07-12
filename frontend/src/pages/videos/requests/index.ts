import httpClient from '@/utils/httpClient';
import type { PaginatedResponse, UpdateVideoPayload, Video } from '../types';

export type VideoRequests = {
  getVideos: (page: number, limit: number) => Promise<PaginatedResponse>;
  getVideo: (id: string) => Promise<Video>;
  updateVideo: (id: string, data: UpdateVideoPayload) => Promise<Video>;
};

export const useVideoRequests = (): VideoRequests => {
  const getVideos = (page: number, limit: number): Promise<PaginatedResponse> => {
    return httpClient<PaginatedResponse>({
      method: 'get',
      url: '/api/videos',
      params: { page, limit },
    });
  };

  const getVideo = (id: string): Promise<Video> => {
    return httpClient<Video>({
      method: 'get',
      url: `/api/videos/${id}`,
    });
  };

  const updateVideo = (id: string, data: UpdateVideoPayload): Promise<Video> => {
    return httpClient<Video, UpdateVideoPayload>({
      method: 'patch',
      url: `/api/videos/${id}`,
      data,
    });
  };

  return { getVideos, getVideo, updateVideo };
};
