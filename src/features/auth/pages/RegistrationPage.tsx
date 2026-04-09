import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useMemo, useRef, useState } from 'react';
import TenantInformationComponent from '../components/RegistrationSteps/TenantInformationComponent';
import TenantAddressComponent from '../components/RegistrationSteps/TenantAddressComponent';
import CreateAdminComponent from '../components/RegistrationSteps/CreateAdminComponent';
import { FormProvider, useForm } from 'react-hook-form';
import type { RegisterForm } from '../interfaces/RegisterFormInterface';
import type { TenantRegistrationRequest } from '../interfaces/AuthInterface';
import { useRegister } from '../hooks/useRegister';

function mapToRequest(data: RegisterForm): TenantRegistrationRequest {
    return {
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
    };
}

export default function RegistrationPage(){
    const [isRegisterCompleted, setIsRegisterCompleted] = useState(false);
    const { register } = useRegister();

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
        const request = mapToRequest(data);
        const response = await register(request);

        if (response?.ResponseCode === "SUCCESS") {
            setIsRegisterCompleted(true);
        }
    });
    
    if(!isRegisterCompleted){
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
    }else{
        return(
            <>
                <h2>Please check your email to verify your account</h2>
                <p className="m-0">
                    We’ve sent you a verification link—just click it to complete the process. If you don’t see the email, be sure to check your spam or junk folder.
                </p>
            </>
        );
    }
    
}