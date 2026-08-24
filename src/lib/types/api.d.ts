declare type ErrorResponse = {
  status: boolean;
  code: number;
  message: string;
};

declare type SuccessResponse<T> = {
  status: boolean;
  code: number;
  message?: string;
  payload: T;
};

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
