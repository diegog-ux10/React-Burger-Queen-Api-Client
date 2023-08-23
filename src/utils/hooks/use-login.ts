import { useState } from "react";

import { login } from "../../services/token-repository";
import { LoginResponse } from "../../models/response";

type RequestStatus = "loading" | "success" | "error" | "idle";

type RequestOptions<TResponse = any, TError = Error> = {
  onSuccess?: (response: TResponse) => void;
  onError?: (error: TError) => void;
};

type PostRequestArgs<TPayload = any, TResponse = any> = {
  payload: TPayload;
  options?: RequestOptions<TResponse>;
};

type LoginRequestPayload = {
  email: string;
  password: string;
};

type LoginRequestArgs = PostRequestArgs<LoginRequestPayload, LoginResponse>;

type LoginRequest = (args: LoginRequestArgs) => void;

export const useLogin = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");
  const loginRequest: LoginRequest = ({ payload, options }) => {
    setRequestStatus("loading");
    login(payload.email, payload.password)
      .then((res) => {
        if (options?.onSuccess) options.onSuccess(res);
        setRequestStatus("success");
      })
      .catch((error) => {
        if (options?.onError) options.onError(error);
        setRequestStatus("error");
      });
  };

  return {
    loginRequestStatus: requestStatus,
    loginRequest,
  };
};
