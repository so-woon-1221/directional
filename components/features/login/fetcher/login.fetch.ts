"use server";

import { cookies } from "next/headers";
import { unwrapResultForQuery } from "@/utils/error";
import { serverFetch } from "@/utils/serverFetch";
import type { LoginFormData } from "../types/schema";

interface LoginResponse {
  token: string;
}

export const loginFn = async ({ email, password }: LoginFormData) => {
  const response = await serverFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = unwrapResultForQuery(response);

  // 성공 시 쿠키에 토큰 저장
  const cookieStore = await cookies();
  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  return data;
};
