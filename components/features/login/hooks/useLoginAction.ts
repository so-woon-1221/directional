import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginFn } from "../fetcher/login.fetch";
import type { LoginFormData } from "../types/schema";

export const useLoginAction = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (props: LoginFormData) => {
      const response = await loginFn(props);

      return response;
    },
    onSuccess: () => {
      router.push("/posts");
      router.refresh();
    },
  });
};
