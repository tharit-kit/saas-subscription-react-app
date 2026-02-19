import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { RegisterForm } from "../../interfaces/interfaces";

export default function CreateAdminComponent(){
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<RegisterForm>();

    return (
        <div className="flex flex-col gap-4 w-full">
            <label htmlFor="display-name">Display Name</label>
            <InputText id="display-name" 
            {...register("displayName", 
                { 
                    required: true,
                    maxLength: 20
                })} 
            invalid={!!errors.displayName} 
            aria-describedby="display-name-help" />
            {errors.displayName && errors.displayName.type === "required" && (
                <small id="display-name-help" className="error-message" >
                    Display Name is required
                </small>
            )}
            {errors.displayName && errors.displayName.type === "maxLength" && (
                <small id="display-name-help" className="error-message" >
                    Maximum length exceeded
                </small>
            )}


            <label htmlFor="email">Email</label>
            <InputText id="email" aria-describedby="email-help" />
            <InputText id="email" 
            {...register("email", 
                { 
                    required: true,
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email is invalid"
                    }
                })} 
            invalid={!!errors.email} 
            aria-describedby="email-help" />
            {errors.email && errors.email.type === "required" && (
                <small id="email-help" className="error-message" >
                    Email is required
                </small>
            )}
            {errors.email && errors.email.type === "pattern" && (
                <small id="email-help" className="error-message" >
                    Email is invalid
                </small>
            )}
            {/* <small id="email-help">
                Enter your username to reset your password.
            </small> */}

            <label htmlFor="password">Password</label>
            <Password value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} feedback={false} toggleMask inputStyle={{ width: '100%' }}/>
            {/* <small id="password-help">
                Enter your username to reset your password.
            </small> */}

            <label htmlFor="confirm-password">Confirm Password</label>
            <Password value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} feedback={false} toggleMask inputStyle={{ width: '100%' }}/>
            {/* <small id="company-name-help">
                Enter your username to reset your password.
            </small> */}
        </div>
    );
}