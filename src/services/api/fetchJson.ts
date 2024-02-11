export const fetchJson = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred.");
  }

  return data;
};
