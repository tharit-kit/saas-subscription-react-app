import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { Button } from "primereact/button";
import ResendButton from "../../../shared/components/ResendButton";
import { useResendVerificationEmail } from "../hooks/useResendVerificationEmail";
import type { ApiResponse } from "../../../shared/interfaces/ApiResponse";
import type { EmailVerificationResponse } from "../interfaces/AuthInterface";

export default function EmailVerificationPage(){
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { verifyEmail } = useVerifyEmail();
    const [response, setResponse] = useState<ApiResponse<EmailVerificationResponse>>();
    const { resendVerificationEmail } = useResendVerificationEmail();

    useEffect(() => {
        async function verify(id: string) {
            const response = await verifyEmail(id);
            setResponse(response);
        }
        verify(token || "");
    });

    if(response?.responseCode == "SUCCESS"){
        return (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <h2 className="text-2xl font-semibold mb-2">
                    Your email has been successfully verified.
                </h2>

                <p className="text-gray-600 mb-2 max-w-md">
                    You can now sign in to your account.
                </p>

                <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Button 
                        label="Go to Signin" 
                    />

                    <ResendButton<ApiResponse<null>> onResend={() => resendVerificationEmail(response.data.userId, response.data.tenantId)} label="Resend Verification Email"></ResendButton>
                </div>
            </div>
        );
    }else if(response?.responseCode == "EMAIL_ALREADY_VERIFIED"){
        return (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <h2 className="text-2xl font-semibold mb-2">
                    This email is already verified.
                </h2>

                <p className="text-gray-600 mb-2 max-w-md">
                    Please sign in to continue.
                </p>

                <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Button 
                        label="Go to Signin" 
                    />
                </div>
            </div>
        );
    }else if(response?.responseCode == "USER_REJECTED"){
        return (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <h2 className="text-2xl font-semibold mb-2">
                    Your email has been rejected.
                </h2>

                <p className="text-gray-600 mb-2 max-w-md">
                    You can no longer use this email.
                </p>
            </div>
        );
    }
}