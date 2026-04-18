import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import type { ResendButtonProps } from "../types/ResendButtonProps";

export default function ResendButton<T>({
    onResend,
    label,
    initialSeconds = 0,
    countdown = 60,
    className
}: ResendButtonProps<T>) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [loading, setLoading] = useState(false);

    const isDisabled = seconds > 0 || loading;

    async function handleClick() {
        try {
            setLoading(true);
            await onResend();
            setSeconds(countdown);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (seconds === 0) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    return (
        <Button
            className={className}
            label={
                seconds > 0
                    ? `Resend in ${seconds}s`
                    : label
            }
            onClick={handleClick}
            disabled={isDisabled}
            loading={loading}
            outlined
        />
    );
}