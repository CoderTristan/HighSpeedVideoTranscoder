const BASE_URL = 'http://localhost:8080/api/v1';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const apiRequest = async <T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    body: unknown = null,
    isFormData: boolean = false
): Promise<T> => {
  const token = localStorage.getItem('jwt_token');
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token && token !== 'undefined' && token !== 'null') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : null
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An unexpected error occurred');
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json() as T;
  } else {
    const text = await response.text();
    return text as unknown as T;
  }
};

export const fetchMyVideos = async (): Promise<string[]> => {
  return apiRequest<string[]>(
      "/video/my-videos",
      "GET"
  );
};

export const processVideo = async (
    file: File,
    action: 'compress' | 'proxy' | 'audio' | 'silence_trim'
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<string>(
      `/video/process?action=${action}`,
      "POST",
      formData,
      true
  );
};