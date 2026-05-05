import axios from 'axios';

// Create an instance of axios with some default configuration
const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  // Extract tenant from URL: /t/acme/...
  const pathParts = window.location.pathname.split("/");
  const tenantSlug = pathParts[1] === "t" ? pathParts[2] : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (tenantSlug) {
    config.headers["X-Tenant-Slug"] = tenantSlug;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;