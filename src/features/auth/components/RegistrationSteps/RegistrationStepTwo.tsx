import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import type { Country } from "../../types";

export default function RegistrationStepTwo(){
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const countries: Country[] = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    const selectedCountryTemplate = (option: Country, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${option.code}.svg`} className="mr-2" style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option: Country) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${option.code}.svg`} className="mr-2" style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };
    
    return(
        <div className="flex flex-col gap-4 justify-center">
            <label htmlFor="address-1">Address 1</label>
            <InputText id="address-1" aria-describedby="address-1-help" />
            <small id="address-1-help">
                Enter your username to reset your password.
            </small>
            
            <label htmlFor="address-2">Address 2</label>
            <InputText id="address-2" aria-describedby="address-2-help" />
            <small id="address-2-help">
                Enter your username to reset your password.
            </small>

            <label htmlFor="country">Country</label>
            <Dropdown value={selectedCountry} onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)} options={countries} optionLabel="name" placeholder="Select a Country" 
                filter filterDelay={400} valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} aria-describedby="country-help" />
            <small id="country-help">
                Enter your username to reset your password.
            </small>

            <label htmlFor="district">District</label>
            <InputText id="district" aria-describedby="district-help" />
            <small id="district-help">
                Enter your username to reset your password.
            </small>

            <label htmlFor="subdistrict">Subdistrict</label>
            <InputText id="subdistrict" aria-describedby="subdistrict-help" />
            <small id="subdistrict-help">
                Enter your username to reset your password.
            </small>

            <label htmlFor="province">Province</label>
            <InputText id="province" aria-describedby="province-help" />
            <small id="province-help">
                Enter your username to reset your password.
            </small>

            <label htmlFor="zipcode">Zipcode</label>
            <InputText id="zipcode" aria-describedby="zipcode-help" />
            <small id="zipcode-help">
                Enter your username to reset your password.
            </small>
        </div>
    );
}