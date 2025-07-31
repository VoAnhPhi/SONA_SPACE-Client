export const API_URL = import.meta.env.VITE_API_BASE_URL;

export const convertToAdminApiUrl = (url: string) => {
      if (API_URL.endsWith("/") && url.startsWith("/")) {
            return API_URL + url.slice(1);
      }
      if (!API_URL.endsWith("/") && !url.startsWith("/")) {
            return API_URL + "/" + url;
      }
      return API_URL + url;
};
