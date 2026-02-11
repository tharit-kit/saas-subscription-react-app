import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { InputText } from 'primereact/inputtext';
import { useRef } from 'react';

export default function RegistrationPage(){
    const stepperRef = useRef<Stepper | null>(null);

    return (
        <div className="flex justify-center">
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                <StepperPanel header="Header I">
                    <div className="flex flex-col gap-4 justify-center">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" aria-describedby="username-help" />
                        <small id="username-help">
                            Enter your username to reset your password.
                        </small>

                        <label htmlFor="username">Username</label>
                        <InputText id="username" aria-describedby="username-help" />
                        <small id="username-help">
                            Enter your username to reset your password.
                        </small>

                        <label htmlFor="username">Username</label>
                        <InputText id="username" aria-describedby="username-help" />
                        <small id="username-help">
                            Enter your username to reset your password.
                        </small>
                    </div>
                    <div className="flex pt-4 justify-end">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Header II">
                    <div className="flex flex-col gap-4 justify-center">
                        <div>
                            Content II
                        </div>
                    </div>
                    <div className="flex pt-4 justify-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Header III">
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