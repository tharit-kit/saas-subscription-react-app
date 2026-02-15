import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function TenantInformationComponent(){
    const [selectedBusinessType, setSelectedBusinessType] = useState(null);
    const businessTypes = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    
    return(
        <div className="flex flex-col gap-4 justify-center">
            <label htmlFor="company-name">Company Name</label>
            <InputText id="company-name" aria-describedby="company-name-help" />
            {/* <small id="company-name-help">
                Enter your username to reset your password.
            </small> */}

            <label htmlFor="business-type">Business Type</label>
            <Dropdown value={selectedBusinessType} onChange={(e) => setSelectedBusinessType(e.value)} options={businessTypes} optionLabel="name" 
                placeholder="Select a Business Type" />
            {/* <small id="business-type-help">
                Enter your username to reset your password.
            </small> */}
        </div>
    );
}