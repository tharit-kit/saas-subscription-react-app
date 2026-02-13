import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef } from 'react';
import RegistrationStepOne from '../components/RegistrationSteps/RegistrationStepOne';
import RegistrationStepTwo from '../components/RegistrationSteps/RegistrationStepTwo';

export default function RegistrationPage(){
    const stepperRef = useRef<Stepper | null>(null);

    return (
        <div className="flex justify-center">
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                <StepperPanel header="Company Information">
                    <RegistrationStepOne></RegistrationStepOne>
                    <div className="flex pt-4 justify-end">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Company Address">
                    <RegistrationStepTwo></RegistrationStepTwo>
                    <div className="flex pt-4 justify-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Register Admin">
                    <div className="flex flex-col gap-4 justify-center">
                        <div>
                            Content III
                        </div>
                    </div>
                    <div className="flex pt-4 justify-start">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                    </div>
                </StepperPanel>
            </Stepper>
        </div>
    );
}