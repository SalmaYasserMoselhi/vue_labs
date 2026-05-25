import { ref } from "vue";

export const useApi = (baseUrl) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const getAll = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getOne = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const update = async (id, body) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  return { data, error, loading, getAll, getOne, update };
};
