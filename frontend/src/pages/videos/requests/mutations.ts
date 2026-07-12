import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useVideoRequests } from '../requests';
import type { UpdateVideoPayload } from '../types';

export const useUpdateVideoMutation = () => {
  const queryClient = useQueryClient();
  const { updateVideo } = useVideoRequests();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVideoPayload }) =>
      updateVideo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
};
