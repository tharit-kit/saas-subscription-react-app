import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginRequest, LoginResponse } from "../../interfaces/AuthInterface";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Button } from "primereact/button";

export default function LoginPage(){
    const { login } = useLogin();
    const [responseData, setResponseData] = useState<LoginResponse>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>();

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        console.log(data);
        const response = await login(data);
        if (response?.isSuccess) {
            setResponseData(response.data);
            localStorage.setItem("accessToken", responseData?.accessToken || "");
            localStorage.setItem("tenants", JSON.stringify(responseData?.memberships));
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Sign in</h2>

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                
                <div>
                    <label htmlFor="email">Email</label>
                    <InputText
                    id="email"
                    {...register("email", {
                        required: true,
                        pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email is invalid",
                        },
                    })}
                    invalid={!!errors.email}
                    />
                    {errors.email?.type === "required" && (
                    <small className="error-message">Email is required</small>
                    )}
                    {errors.email?.type === "pattern" && (
                    <small className="error-message">Email is invalid</small>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <InputText
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    invalid={!!errors.password}
                    />
                    {errors.password?.type === "required" && (
                    <small className="error-message">Password is required</small>
                    )}
                </div>

                <div className="login-actions">
                    <Button label="Sign in" type="submit" className="w-full" />
                </div>

                </form>
            </div>
        </div>
    );
}