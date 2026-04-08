import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useMemo, useRef, useState } from 'react';
import TenantInformationComponent from '../components/RegistrationSteps/TenantInformationComponent';
import TenantAddressComponent from '../components/RegistrationSteps/TenantAddressComponent';
import CreateAdminComponent from '../components/RegistrationSteps/CreateAdminComponent';
import { FormProvider, useForm } from 'react-hook-form';
import type { RegisterForm } from '../interfaces/RegisterFormInterface';
import type { TenantRegistrationRequest, TenantRegistrationResponse } from '../interfaces/AuthInterface';
import { registerService } from '../components/services/authService';
import type { ApiResponse } from '../../../shared/interfaces/ApiResponse';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage(){
    const [registerResponse, setRegisterResponse] = useState<ApiResponse<TenantRegistrationResponse> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const stepperRef = useRef<Stepper | null>(null);

    const methods = useForm<RegisterForm>({
        mode: "onTouched",
        defaultValues: {
            companyName: "",
            businessType: "",
            subdomain: "",
            address1: "",
            address2: "",
            country: "",
            district: "",
            subdistrict: "",
            province: "",
            zipcode: "",
            fullName: "",
            email: "",
            password: "",
            confirmedPassword: ""
        },
    });

    const { handleSubmit, trigger, formState } = methods;

    const stepFields = useMemo(
        () => ({
            tenantInfo: ["companyName", "businessType", "subdomain"] as const,
            tenantAddress: ["address1", "address2", "country", "district", "subdistrict", "province", "zipcode"] as const,
            createAdmin: ["fullName", "email", "password", "confirmPassword"] as const,
        }),
        []
    );

    async function nextStep(fields: readonly (keyof RegisterForm)[]) {
        const ok = await trigger(fields, { shouldFocus: true });
        if (ok) stepperRef.current?.nextCallback();
    }

    const onSubmit = handleSubmit(async (data) => {
        const request: TenantRegistrationRequest = {
            tenantInfo: {
                tenantName: data.companyName,
                businessType: data.businessType,
                subdomain: data.subdomain
            },
            tenantAddress: {
                address1: data.address1,
                address2: data.address2,
                country: data.country,
                district: data.district,
                subdistrict: data.subdistrict,
                province: data.province,
                zipcode: data.zipcode
            },
            newAdmin: {
                fullName: data.fullName,
                email: data.email,
                confirmPassword: data.confirmedPassword
            }
        }

        try {
            setLoading(true);
            setError(null);

            const response = await registerService(request);
            setRegisterResponse(response);
            
            if (registerResponse?.ResponseCode == "S01") {
                navigate("/check-your-email", {replace: true});
            }
            console.log(loading);
            console.log(error);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    });
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="flex justify-center">
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                    <StepperPanel header="Tenant Information">
                        <TenantInformationComponent></TenantInformationComponent>
                        <div className="flex pt-4 justify-end">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => nextStep(stepFields.tenantInfo)} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Tenant Address">
                        <TenantAddressComponent></TenantAddressComponent>
                        <div className="flex pt-4 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => nextStep(stepFields.tenantAddress)} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Create Admin">
                        <CreateAdminComponent></CreateAdminComponent>
                        <div className="flex pt-4 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                            <Button type="submit" label="Submit" icon="pi pi-check" disabled={formState.isSubmitting} />
                        </div>
                    </StepperPanel>
                </Stepper>
            </form>
        </FormProvider>
    );
}