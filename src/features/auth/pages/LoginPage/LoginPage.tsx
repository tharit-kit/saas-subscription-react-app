import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginRequest } from "../../interfaces/AuthInterface";
import { InputText } from "primereact/inputtext";
import { useLogin } from "../../hooks/useLogin";
import { Button } from "primereact/button";
import './login-page.css';
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const navigate = useNavigate();
    const { login } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>();

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        const response = await login(data);
        if (response?.isSuccess) {
            localStorage.setItem("accessToken", response.data.accessToken || "");
            localStorage.setItem("memberships", JSON.stringify(response.data.memberships));
            navigate(`/t/${response.data.memberships[0].slug}/dashboard`);
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