"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
	assertNever,
	type ErrorResponse,
	ErrorType,
	QueryError,
} from "./error";

/**
 * 전역 에러 핸들러 훅
 * React Query의 QueryCache/MutationCache onError에서 사용
 */
export const useGlobalErrorHandler = () => {
	const router = useRouter();

	const handleError = useCallback(
		(error: unknown) => {
			console.error("[Global Error Handler]", error);

			let errorResponse: ErrorResponse;

			// QueryError 타입 체크
			if (QueryError.isQueryError(error)) {
				errorResponse = error.errorResponse;
			} else if (error instanceof Error) {
				// 일반 에러 처리
				errorResponse = {
					message: error.message,
					code: ErrorType.UNKNOWN,
				};
			} else {
				errorResponse = {
					message: String(error),
					code: ErrorType.UNKNOWN,
				};
			}

			// 에러 타입별 처리
			switch (errorResponse.code) {
				case ErrorType.AUTH:
					// 인증 에러 - 로그인 페이지로 리다이렉트
					alert(errorResponse.message);
					router.push("/login");
					break;

				case ErrorType.NETWORK:
					// 네트워크 에러 - 사용자에게 알림
					alert(`네트워크 오류: ${errorResponse.message}`);
					break;

				case ErrorType.SERVER:
					// 서버 에러 - 상태 코드별 처리
					if (errorResponse.status === 500) {
						alert(
							"서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
						);
					} else {
						alert(
							`서버 오류 (${errorResponse.status}): ${errorResponse.message}`,
						);
					}
					break;

				case ErrorType.UNKNOWN:
					// 알 수 없는 에러
					alert(`오류가 발생했습니다: ${errorResponse.message}`);
					break;

				default:
					// 모든 ErrorType을 처리했는지 컴파일 타임 체크
					assertNever(errorResponse.code);
			}
		},
		[router],
	);

	return handleError;
};

/**
 * 컴포넌트 레벨에서 사용할 수 있는 에러 핸들러
 * 특정 에러 타입만 따로 처리하고 싶을 때 사용
 */
export const createErrorHandler = (
	customHandlers?: Partial<Record<ErrorType, (error: ErrorResponse) => void>>,
) => {
	return (error: unknown) => {
		if (!QueryError.isQueryError(error)) {
			console.error("Unexpected error type:", error);
			return;
		}

		const errorResponse = error.errorResponse;
		const customHandler = customHandlers?.[errorResponse.code];

		if (customHandler) {
			customHandler(errorResponse);
		} else {
			// 기본 처리 (콘솔 출력)
			console.error(`[${errorResponse.code}]`, errorResponse.message);
		}
	};
};
