import { useQuery } from '@tanstack/react-query';
import { useVideoRequests } from '../requests';
import type { PaginatedResponse, Video } from '../types';

export const useVideosQuery = (page: number, limit: number) => {
  const { getVideos } = useVideoRequests();
  return useQuery<PaginatedResponse>({
    queryKey: ['videos', page, limit],
    queryFn: () => getVideos(page, limit),
  });
};

export const useVideoQuery = (id: string) => {
  const { getVideo } = useVideoRequests();
  return useQuery<Video>({
    queryKey: ['video', id],
    queryFn: () => getVideo(id),
    enabled: !!id,
  });
};
