import Cookies from "js-cookie";
import { useState } from "react";
import { client } from "../api/client";

export const useListUsers = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const listUsers = async () => {
    setIsLoading(true);
    setError(null);
    const {
      data: { statusCode, data, message },
    } = await client
      .get("users")
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (statusCode === 200) {
      setError("");
      return data;
    }
    setError(message);
    return [];
  };

  return { listUsers, error, isLoading };
};

export const useCreateUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (info: {
    email: string;
    password: string;
    username: string;
    fullname: string;
  }) => {
    setIsLoading(true);
    setError(null);
    const {
      status,
      data: { message },
    } = await client
      .post("users", info)
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (status === 201) {
      setError("");
      return true;
    }
    setError(message);
    return false;
  };

  return { createUser, error, isLoading };
};

export const useDeleteUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async (email: string) => {
    setIsLoading(true);
    setError(null);
    const {
      data: { statusCode, data, message },
    } = await client
      .delete(`users/${email}`)
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (statusCode === 204) {
      setError("");
      return true;
    }
    setError(message);
    return false;
  };

  return { deleteUser, error, isLoading };
};

export const useUserLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const {
      data: { statusCode, data, message },
    } = await client
      .post("login", {
        email,
        password,
      })
      .catch(error => {
        return error.response;
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (statusCode === 200) {
      setError("");
      Cookies.set("token", data.token);
      return true;
    }
    setError(message);
    return false;
  };

  return { login, error, isLoading };
};
