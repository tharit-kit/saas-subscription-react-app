import { useState } from "react";
import axios from "axios";
import type { LoginRequest, LoginResponse } from "../interfaces/AuthInterface";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import { loginService } from "../components/services/authService";

const CREDENTIALS_ERROR_MESSAGE =
    "The email address or password you entered is incorrect. Please check your details and try again.";

const SYSTEM_ERROR_MESSAGE =
    "We’re unable to sign you in right now due to a system error. Please try again in a few moments.";

function getLoginErrorMessage(responseCode?: string) {
    switch (responseCode) {
        case "UNAUTHORIZED":
        case "USER_NOT_FOUND":
            return CREDENTIALS_ERROR_MESSAGE;
        case "SYSTEM_ERROR":
        default:
            return SYSTEM_ERROR_MESSAGE;
    }
}

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ApiResponse<LoginResponse> | null>(null);

    const login = async (request: LoginRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await loginService(request);
            setData(response);

            if (!response.isSuccess) {
                setError(getLoginErrorMessage(response.responseCode));
            }

            return response;
        } catch (err: unknown) {
            const responseCode = axios.isAxiosError<ApiResponse<LoginResponse>>(err)
                ? err.response?.data?.responseCode
                : undefined;

            setError(getLoginErrorMessage(responseCode));
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, data };
}
