import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef } from 'react';
import TenantInformationComponent from '../components/RegistrationSteps/TenantInformationComponent';
import TenantAddressComponent from '../components/RegistrationSteps/TenantAddressComponent';
import CreateAdminComponent from '../components/RegistrationSteps/CreateAdminComponent';

export default function RegistrationPage(){
    const stepperRef = useRef<Stepper | null>(null);

    return (
        <div className="flex justify-center">
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                <StepperPanel header="Tenant Information">
                    <TenantInformationComponent></TenantInformationComponent>
                    <div className="flex pt-4 justify-end">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Tenant Address">
                    <TenantAddressComponent></TenantAddressComponent>
                    <div className="flex pt-4 justify-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Create Admin">
                    <CreateAdminComponent></CreateAdminComponent>
                    <div className="flex pt-4 justify-start">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                    </div>
                </StepperPanel>
            </Stepper>
        </div>
    );
}