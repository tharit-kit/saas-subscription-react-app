import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginRequest, LoginResponse } from "../../interfaces/AuthInterface";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Button } from "primereact/button";
import './login-page.css';

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
                <h1 className="login-title">Sign in</h1>

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                
                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                            value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email is invalid",
                            },
                        })}
                        className={errors.email ? "p-invalid" : ""}
                    />
                    {errors.email && (
                    <small className="error-message">
                        {errors.email.message}
                    </small>
                    )}
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <InputText
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className={errors.password ? "p-invalid" : ""}
                    />
                    {errors.password && (
                    <small className="error-message">
                        {errors.password.message}
                    </small>
                    )}
                </div>

                {/* Button */}
                <div className="login-actions">
                    <Button label="Sign in" type="submit" />
                </div>
                </form>
            </div>
        </div>
    );
}