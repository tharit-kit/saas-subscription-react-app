import { useState } from "react";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import { registerService } from "../components/services/authService";
import type { TenantRegistrationRequest, TenantRegistrationResponse } from "../interfaces/AuthInterface";

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ApiResponse<TenantRegistrationResponse> | null>(null);

    const register = async (request: TenantRegistrationRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await registerService(request);
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

    return { register, loading, error, data };
}