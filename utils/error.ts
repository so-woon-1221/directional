export enum ErrorType {
	UNKNOWN = "UNKNOWN",
	NETWORK = "NETWORK",
	SERVER = "SERVER",
	AUTH = "AUTH",
}

export interface ErrorResponse {
	message: string;
	code: ErrorType;
	status?: number;
}

/**
 * Result 타입: 성공/실패를 명확하게 표현
 */
export type Result<T> =
	| { success: true; data: T }
	| { success: false; error: ErrorResponse };

/**
 * 에러를 정규화하여 ErrorResponse로 변환
 */
export const getNormalizedError = async (
	err: unknown,
): Promise<ErrorResponse> => {
	if (err instanceof Response) {
		let serverMessage: string;
		try {
			const body = await err.json();
			serverMessage = body.message || body.error;
		} catch {
			serverMessage = err.statusText;
		}

		if (err.status === 401 || err.status === 403) {
			return {
				message: serverMessage || "인증에 실패했습니다.",
				code: ErrorType.AUTH,
				status: err.status,
			};
		}
		return {
			message: serverMessage || "서버 오류가 발생했습니다.",
			code: ErrorType.SERVER,
			status: err.status,
		};
	}

	if (err instanceof Error) {
		return { message: err.message, code: ErrorType.NETWORK };
	}

	return { message: String(err), code: ErrorType.UNKNOWN };
};

/**
 * Result 타입 헬퍼 함수들
 */
export const createSuccess = <T>(data: T): Result<T> => ({
	success: true,
	data,
});

export const createError = <T>(error: ErrorResponse): Result<T> => ({
	success: false,
	error,
});

/**
 * Result를 unwrap하는 헬퍼 (throw 방식 선호 시)
 */
export const unwrapResult = <T>(result: Result<T>): T => {
	if (result.success) {
		return result.data;
	}
	throw new Error(result.error.message);
};

/**
 * exhaustiveness checking을 위한 헬퍼
 * switch 문에서 모든 케이스를 처리했는지 컴파일 타임에 체크
 */
export const assertNever = (value: never): never => {
	throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
};

/**
 * React Query용 커스텀 에러 클래스
 * QueryCache의 onError에서 이 타입으로 체크 가능
 */
export class QueryError extends Error {
	public readonly errorResponse: ErrorResponse;

	constructor(errorResponse: ErrorResponse) {
		super(errorResponse.message);
		this.name = "QueryError";
		this.errorResponse = errorResponse;
	}

	static isQueryError(error: unknown): error is QueryError {
		return error instanceof QueryError;
	}
}

/**
 * React Query의 queryFn에서 사용하는 헬퍼
 * Result를 체크해서 에러면 throw
 */
export const unwrapResultForQuery = <T>(result: Result<T>): T => {
	if (result.success) {
		return result.data;
	}
	throw new QueryError(result.error);
};
