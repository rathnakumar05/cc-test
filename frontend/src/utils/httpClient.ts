import { apiClient } from './axios';

export interface HttpClientConfig<TData = unknown> {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  data?: TData;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}

const httpClient = async <TResponse, TData = unknown>(config: HttpClientConfig<TData>): Promise<TResponse> => {
  const response = await apiClient.request<TResponse>(config);
  return response.data;
};

export default httpClient;
