import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useMemo, useRef } from 'react';
import TenantInformationComponent from '../components/RegistrationSteps/TenantInformationComponent';
import TenantAddressComponent from '../components/RegistrationSteps/TenantAddressComponent';
import CreateAdminComponent from '../components/RegistrationSteps/CreateAdminComponent';
import { FormProvider, useForm } from 'react-hook-form';
import type { RegisterForm } from '../interfaces/interfaces';

export default function RegistrationPage(){
    const stepperRef = useRef<Stepper | null>(null);

    const methods = useForm<RegisterForm>({
        mode: "onTouched",
        defaultValues: {
            companyName: "",
            businessTypeId: "",
            address1: "",
            address2: "",
            country: "",
            district: "",
            subdistrict: "",
            province: "",
            zipcode: "",
            displayName: "",
            email: "",
            password: "",
            confirmedPassword: ""
        },
    });

    const { handleSubmit, trigger, formState } = methods;

    const stepFields = useMemo(
        () => ({
            tenantInfo: ["companyName", "businessTypeId"] as const,
            tenantAddress: ["address1", "address2", "country", "district", "subdistrict", "province", "zipcode"] as const,
            createAdmin: ["displayName", "email", "password", "confirmPassword"] as const,
        }),
        []
    );

    async function nextStep(fields: readonly (keyof RegisterForm)[]) {
        const ok = await trigger(fields, { shouldFocus: true });
        if (ok) stepperRef.current?.nextCallback();
    }

    const onSubmit = handleSubmit(async (data) => {
        // This validates everything by default when submitting
        console.log("submit", data);
        // call API here
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