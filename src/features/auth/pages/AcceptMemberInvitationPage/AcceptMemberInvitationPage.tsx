import { useLoaderData } from "react-router-dom";
import type { verifyMemberInvitationLoader } from "../../loaders/verifyMemberInvitationLoader";
import { InputText } from "primereact/inputtext";
import { Controller, useForm, useWatch } from "react-hook-form";
import { allRulesPassed, passwordRules } from "../../components/PasswordChecklist/PasswordRules";
import { Password } from "primereact/password";
import type { MemberAcceptanceForm } from "../../interfaces/MemberAcceptanceFormInterface";
import { useMemo, useState } from "react";
import { PasswordChecklist } from "../../components/PasswordChecklist/PasswordChecklistComponent";
import { Button } from "primereact/button";
import type {
  AcceptMemberInvitationRequest,
  AcceptMemberInvitationResponse,
} from "../../interfaces/AuthInterface";
import { useAcceptMemberInvitation } from "../../hooks/useAcceptMemberInvitation";

export default function AcceptMemberInvitationPage() {
  const loaderRes = useLoaderData<typeof verifyMemberInvitationLoader>();
  const { acceptMemberInvitation } = useAcceptMemberInvitation();
  const [isAcceptCompleted, setIsAcceptCompleted] = useState(false);
  const [responseData, setResponseData] = useState<AcceptMemberInvitationResponse>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<MemberAcceptanceForm>({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const password = useWatch({
    control,
    name: "password",
  });
  const passed = useMemo(() => allRulesPassed(password, passwordRules), [password]);
  const showChecklist = !!dirtyFields.password && !passed;

  const onSubmit = async (data: MemberAcceptanceForm) => {
    const request: AcceptMemberInvitationRequest = {
      token: loaderRes.token,
      isNewUser: loaderRes.response.data.isNewUser,
      FullName: data.fullName,
      Password: data.password,
      ComfirmPassword: data.confirmedPassword,
    };

    const response = await acceptMemberInvitation(request);
    if (response?.isSuccess) {
      setResponseData(response.data);
      setIsAcceptCompleted(true);
    }
  };

  if (!loaderRes.response.isSuccess) {
    return (
      <div className="invitation-error-page">
        <div className="invitation-error-card">
          <div className="error-icon">
            <span>!</span>
          </div>

          <h1>Invitation Not Found</h1>

          <p className="description">
            We couldn't find this member invitation. The invitation may be invalid, expired, or no
            longer available.
          </p>

          <p className="help-text">
            Please contact your organization administrator and ask them to send you a new
            invitation.
          </p>
        </div>
      </div>
    );
  }

  if (isAcceptCompleted) {
    return (
      <div className="invitation-success-page">
        <div className="invitation-success-card">
          <div className="success-icon">✓</div>

          <h1>Invitation Accepted</h1>

          <p className="description">
            Welcome, <strong>{responseData?.FullName}</strong>!
          </p>

          <p className="help-text">
            You have successfully joined
            <strong>{responseData?.TenantName}</strong>.
          </p>

          <a href="/login" className="login-button">
            Go to Login
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="member-acceptance-page">
        <div className="member-acceptance-card">
          <h1>Accept Invitation</h1>

          <p className="description">
            You've been invited to join the organization. Complete the information below to accept
            the invitation.
          </p>

          <div className="invited-email">
            <span>Email</span>
            <strong>{loaderRes.response.data.email}</strong>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <label htmlFor="fullName">Full Name</label>

              <InputText
                id="fullName"
                {...register("fullName", {
                  required: "Full name is required",
                })}
                className={errors.fullName ? "p-invalid" : ""}
              />

              {errors.fullName && <small className="p-error">{errors.fullName.message}</small>}
            </div>

            {loaderRes.response.data.isNewUser && (
              <>
                <div className="form-field">
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
                        inputStyle={{ width: "100%" }}
                        invalid={!!errors.password}
                      />
                    )}
                  />

                  {errors.password && errors.password.type === "required" && (
                    <small className="p-error">Password is required</small>
                  )}

                  {showChecklist && (
                    <PasswordChecklist password={password ?? ""} rules={passwordRules} />
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="confirmedPassword">Confirm Password</label>

                  <Controller
                    name="confirmedPassword"
                    control={control}
                    rules={{
                      required: true,
                      validate: {
                        matchPassword: (value) => value === password,
                      },
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
                        inputStyle={{ width: "100%" }}
                        invalid={!!errors.confirmedPassword}
                      />
                    )}
                  />
                  {errors.confirmedPassword && errors.confirmedPassword.type === "required" && (
                    <small id="confirm-password-help" className="p-error">
                      Confirm password is required
                    </small>
                  )}

                  {errors.confirmedPassword &&
                    errors.confirmedPassword.type === "matchPassword" && (
                      <small id="confirm-password-help" className="p-error">
                        Password do not match
                      </small>
                    )}
                </div>
              </>
            )}

            <Button type="submit" label="Accept Invitation" className="accept-button" />
          </form>
        </div>
      </div>
    );
  }
}
