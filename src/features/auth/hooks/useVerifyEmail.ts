import { useState } from "react";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import { verifyEmailService } from "../components/services/authService";
import type { EmailVerificationResponse } from "../interfaces/AuthInterface";

export function useVerifyEmail() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ApiResponse<EmailVerificationResponse> | null>(null);

    const verifyEmail = async (tokenId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await verifyEmailService(tokenId);
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

    return { verifyEmail, loading, error, data };
}