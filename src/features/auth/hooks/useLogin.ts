import { useState } from "react";
import type { LoginRequest, LoginResponse } from "../interfaces/AuthInterface";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import { loginService } from "../components/services/authService";

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

            return response;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, data };
}