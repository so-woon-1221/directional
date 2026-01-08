"use server";

import { cookies } from "next/headers";
import {
  createError,
  createSuccess,
  getNormalizedError,
  type Result,
} from "./error";

export const serverFetch = async <T>(
  url: string | URL,
  init?: RequestInit,
): Promise<Result<T>> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const backendURL =
      process.env.BACKEND_URL || "https://fe-hiring-rest-api.vercel.app";

    const newURL = new URL(url, backendURL);

    const response = await fetch(newURL, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await getNormalizedError(response);
      return createError(errorData);
    }

    const data = (await response.json()) as T;
    return createSuccess(data);
  } catch (error) {
    const errorData = await getNormalizedError(error);
    return createError(errorData);
  }
};
