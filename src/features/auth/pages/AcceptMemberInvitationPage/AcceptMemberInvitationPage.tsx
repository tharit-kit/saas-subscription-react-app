import { useLoaderData } from "react-router-dom";
import type { verifyMemberInvitationLoader } from "../../loaders/verifyMemberInvitationLoader";
import { InputText } from "primereact/inputtext";
import { Controller, useForm, useWatch } from "react-hook-form";
import { allRulesPassed, passwordRules } from "../../components/PasswordChecklist/PasswordRules";
import { Password } from "primereact/password";
import type { MemberAcceptanceForm } from "../../interfaces/MemberAcceptanceFormInterface";
import { useMemo } from "react";
import { PasswordChecklist } from "../../components/PasswordChecklist/PasswordChecklistComponent";
import { Button } from "primereact/button";

export default function AcceptMemberInvitationPage() {
  const loaderRes = useLoaderData<typeof verifyMemberInvitationLoader>();
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

  const onSubmit = (data: MemberAcceptanceForm) => {
    console.log(data);

    if (loaderRes.data.isNewUser) {
      // Existing user request
      const request = {
        fullName: data.fullName,
      };

      console.log(request);
      return;
    }

    // New user request
    const request = {
      fullName: data.fullName,
      password: data.password,
      confirmedPassword: data.confirmedPassword,
    };

    console.log(request);
  };

  if (!loaderRes.isSuccess) {
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

  return (
    <div className="member-acceptance-page">
      <div className="member-acceptance-card">
        <h1>Accept Invitation</h1>

        <p className="description">
          You've been invited to join the organization. Complete the information below to accept the
          invitation.
        </p>

        <div className="invited-email">
          <span>Email</span>
          <strong>{loaderRes.data.email}</strong>
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

          {loaderRes.data.isNewUser && (
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

                {errors.confirmedPassword && errors.confirmedPassword.type === "matchPassword" && (
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
