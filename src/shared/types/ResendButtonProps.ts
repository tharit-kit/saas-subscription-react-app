export type ResendButtonProps<T> = {
    onResend: () => Promise<T> | void;
    label: string;
    initialSeconds?: number;
    countdown?: number;
    className?: string;
};