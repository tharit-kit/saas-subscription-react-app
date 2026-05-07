import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import { Button } from "primereact/button";
import ResendButton from "../../../../shared/components/ResendButton";
import { useResendVerificationEmail } from "../../hooks/useResendVerificationEmail";
import type { ApiResponse } from "../../../../shared/interfaces/ApiResponse";
import type { EmailVerificationResponse } from "../../interfaces/AuthInterface";
import './email-verification-page.css';

export default function EmailVerificationPage(){
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { verifyEmail } = useVerifyEmail();
    const [responseData, setResponseData] = useState<ApiResponse<EmailVerificationResponse>>();
    const { resendVerificationEmail } = useResendVerificationEmail();

    useEffect(() => {
        if (!token) return;
        async function verify(id: string) {
            const response = await verifyEmail(id);
            setResponseData(response);
            console.log(response.responseCode);
        }
        verify(token || "");
    }, [token]);

    if(responseData?.responseCode == "SUCCESS"){
        return (
            <div className="email-verification-container">
                <h2 className="email-title">
                    Your email has been successfully verified.
                </h2>

                <p className="email-description">
                    You can now sign in to your account.
                </p>

                <div className="email-actions">
                    <Button 
                        label="Go to Signin" 
                    />
                </div>
            </div>
        );
    }else if(responseData?.responseCode == "VERIFICATION_TOKEN_EXPIRED"){
        return (
            <div className="email-verification-container">
                <h2 className="email-verification-title">
                    Your verication link has been expired.
                </h2>

                <p className="email-verification-description">
                    Please request a new verification link.
                </p>

                <div className="email-verification-actions">
                    <ResendButton<ApiResponse<null>> onResend={() => resendVerificationEmail(responseData.data.userId, responseData.data.tenantId)} label="Resend Verification Email"></ResendButton>
                </div>
            </div>
        );
    }else if(responseData?.responseCode == "EMAIL_ALREADY_VERIFIED"){
        return (
            <div className="email-verification-container">
                <h2 className="email-verification-title">
                    This email is already verified.
                </h2>

                <p className="email-verification-description">
                    Please sign in to continue.
                </p>

                <div className="email-verification-actions">
                    <Button 
                        label="Go to Signin" 
                    />
                </div>
            </div>
        );
    }else if(responseData?.responseCode == "USER_REJECTED"){
        return (
            <div className="email-verification-container">
                <h2 className="email-verification-title">
                    Your email has been rejected.
                </h2>

                <p className="email-verification-description">
                    You can no longer use this email.
                </p>
            </div>
        );
    }else{
        return (
            <div className="email-verification-container">
                <h2 className="email-verification-title">
                    Something went wrong.
                </h2>

                <p className="email-verification-description">
                    We can't verify your email.
                </p>
            </div>
        );
    }
}