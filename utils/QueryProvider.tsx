"use client";

import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode, useState } from "react";
import { ErrorType, QueryError } from "./error";
import { useGlobalErrorHandler } from "./errorHandler";

interface QueryProviderProps {
	children: ReactNode;
}

function QueryProviderInner({ children }: QueryProviderProps) {
	const handleError = useGlobalErrorHandler();

	const [queryClient] = useState(
		() =>
			new QueryClient({
				queryCache: new QueryCache({
					onError: (error) => {
						// 전역 에러 핸들러 실행
						handleError(error);
					},
				}),
				defaultOptions: {
					queries: {
						retry: (failureCount, error) => {
							// QueryError인 경우에만 재시도 로직 적용
							if (QueryError.isQueryError(error)) {
								const { code } = error.errorResponse;

								// 네트워크 에러만 최대 2번 재시도 (총 3번 요청)
								if (code === ErrorType.NETWORK) {
									return failureCount < 2;
								}

								// 서버 에러 중 500번대는 1번 재시도
								if (
									code === ErrorType.SERVER &&
									error.errorResponse.status &&
									error.errorResponse.status >= 500
								) {
									return failureCount < 1;
								}

								// 인증 에러, 4xx 에러는 재시도 안 함
								return false;
							}

							// 일반 에러는 1번 재시도
							return failureCount < 1;
						},
						staleTime: 60 * 1000, // 1분
						gcTime: 5 * 60 * 1000, // 5분
						refetchOnWindowFocus: false,
					},
					mutations: {
						retry: false, // mutation은 재시도 안 함
						onError: (error) => {
							// mutation 에러도 전역 핸들러로 처리
							handleError(error);
						},
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export function QueryProvider({ children }: QueryProviderProps) {
	return <QueryProviderInner>{children}</QueryProviderInner>;
}
