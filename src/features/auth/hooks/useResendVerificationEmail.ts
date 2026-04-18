import { useState } from "react";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import { resendVerificationEmailService } from "../components/services/authService";

export function useResendVerificationEmail() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ApiResponse<null> | null>(null);

    const resendVerificationEmail = async (userId: string, tenantId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await resendVerificationEmailService(userId, tenantId);
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

    return { resendVerificationEmail, loading, error, data };
}