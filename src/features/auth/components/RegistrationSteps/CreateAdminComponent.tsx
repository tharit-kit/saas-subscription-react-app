import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterForm } from "../../interfaces/interfaces";
import { allRulesPassed, passwordRules } from "../PasswordChecklist/PasswordRules";
import { PasswordChecklist } from "../PasswordChecklist/PasswordChecklistComponent";

export default function CreateAdminComponent(){
    // const [password, setPassword] = useState<string>('');
    //const [confirmPassword, setConfirmPassword] = useState<string>('');

    const {
        register,
        control,
        watch,
        formState: { errors, dirtyFields },
    } = useFormContext<RegisterForm>();

    const password = watch("password");
    const passed = useMemo(() => allRulesPassed(password, passwordRules), [password]);
    const showChecklist = !!dirtyFields.password && !passed;

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

            <label htmlFor="password">Password</label>
            <Controller
                name="password"
                control={control}
                rules={{
                    required: true,
                    validate: (value) => allRulesPassed(value, passwordRules),
                }}
                render={({ field }) => (
                    <Password
                        id="password"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        inputRef={field.ref}
                        toggleMask
                        feedback={false} 
                        inputStyle={{ width: '100%' }}
                        invalid={!!errors.password} 
                    />
                )}
            />
            {errors.password && errors.password.type === "required" && (
                <small id="password-help" className="error-message" >
                    Password is required
                </small>
            )}

            {showChecklist && 
                <PasswordChecklist password={password ?? ""} rules={passwordRules} />
            }

            <label htmlFor="confirm-password">Confirm Password</label>
            <Controller
                name="confirmedPassword"
                control={control}
                rules={{
                    required: true,
                    validate: {
                        matchPassword: (value) => value === password
                    }
                }}
                render={({ field }) => (
                    <Password
                        id="confirm-password"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        inputRef={field.ref}
                        toggleMask
                        feedback={false} 
                        inputStyle={{ width: '100%' }}
                        invalid={!!errors.confirmedPassword} 
                    />
                )}
            />
            {errors.confirmedPassword && errors.confirmedPassword.type === "required" && (
                <small id="confirm-password-help" className="error-message" >
                    Confirm password is required
                </small>
            )}

            {errors.confirmedPassword && errors.confirmedPassword.type === "matchPassword" && (
                <small id="confirm-password-help" className="error-message" >
                    Password do not match
                </small>
            )}
        </div>
    );
}