import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({
      message: "올바른 이메일 형식이 아닙니다",
    })
    .min(1, "이메일을 입력해주세요"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
