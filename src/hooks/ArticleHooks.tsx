import { useState } from "react";
import { client } from "../api/client";

export const useListArticles = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const listArticles = async () => {
    setIsLoading(true);
    setError(null);
    const {
      data: { statusCode, data, message },
    } = await client
      .get("articles")
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (statusCode === 200) {
      setError(null);
      return data;
    }
    setError(message);
    return [];
  };
  return { listArticles, error, isLoading };
};

export const useDeleteArticle = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteArticle = async (id: number) => {
    setIsLoading(true);
    setError(null);
    const {
      status,
      data: { data, message },
    } = await client
      .delete(`articles/${id}`)
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log("useDeleteArticle", { status });
    if (status === 204) {
      setError(null);
      return data;
    }
    setError(message);
    return [];
  };
  return { deleteArticle, error, isLoading };
};

export const useFavoriteArticle = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const favoriteArticle = async (id: number) => {
    setIsLoading(true);
    setError(null);
    const {
      status,
      data: { data, message },
    } = await client
      .post(`articles/${id}/favorite`)
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (status === 200) {
      setError(null);
      return data;
    }
    setError(message);
    return [];
  };
  return { favoriteArticle, error, isLoading };
};

export const useUnfavoriteArticle = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const unfavoriteArticle = async (id: number) => {
    setIsLoading(true);
    setError(null);
    const {
      status,
      data: { data, message },
    } = await client
      .delete(`articles/${id}/favorite`)
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (status === 200) {
      setError(null);
      return data;
    }
    setError(message);
    return [];
  };
  return { unfavoriteArticle, error, isLoading };
};

export const useCreateArticle = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createArticle = async (params: { title: string; body: string }) => {
    setIsLoading(true);
    setError(null);
    const {
      status,
      data: { data, message },
    } = await client
      .post(`articles`, params)
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (status === 201) {
      setError(null);
      return data;
    }
    setError(message);
    return [];
  };
  return { createArticle, error, isLoading };
};

export const useUpdateArticle = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateArticle = async (id: number, params: { title: string; body: string }) => {
    setIsLoading(true);
    setError(null);
    const {
      status,
      data: { data, message },
    } = await client
      .put(`articles/${id}`, params)
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (status === 200) {
      setError(null);
      return data;
    }
    setError(message);
    return [];
  };
  return { updateArticle, error, isLoading };
};
