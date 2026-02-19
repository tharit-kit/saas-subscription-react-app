import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import type { Country, RegisterForm } from "../../interfaces/interfaces";
import { Controller, useFormContext } from "react-hook-form";

export default function TenantAddressComponent(){
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<RegisterForm>();
    
    return(
        <div className="flex flex-col gap-4 justify-center">
            <label htmlFor="address-1">Address 1</label>
            <InputText id="address-1" 
            {...register("address1", { required: "Address 1 is required" })} 
            invalid={!!errors.address1} 
            aria-describedby="address-1-help" />

            {errors.address1 && (
                <small id="address-1-help" className="error-message" >
                    {errors.address1.message}
                </small>
            )}
            
            <label htmlFor="address-2">Address 2</label>
            <InputText id="address-2" 
            {...register("address2", { required: "Address 2 is required" })} 
            invalid={!!errors.address2}
            aria-describedby="address-2-help" />
            {errors.address2 && (
                <small id="address-2-help" className="error-message" >
                    {errors.address2.message}
                </small>
            )}

            <label htmlFor="country">Country</label>
            <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
                <Dropdown
                id="country"
                value={field.value}
                options={countries}
                optionLabel="name"
                placeholder="Select a Country"
                valueTemplate={selectedCountryTemplate} 
                itemTemplate={countryOptionTemplate}
                onChange={(e) => field.onChange(e.value)}
                onBlur={field.onBlur}
                invalid={!!errors.country}
                />
            )}
            />
            {errors.country && (
                <small id="country-help" className="error-message" >
                    {errors.country.message}
                </small>
            )}

            <label htmlFor="district">District</label>
            <InputText id="district" 
            {...register("district", { required: "District is required" })} 
            invalid={!!errors.district}
            aria-describedby="district-help" />
            {errors.district && (
                <small id="district-help" className="error-message" >
                    {errors.district.message}
                </small>
            )}

            <label htmlFor="subdistrict">Subdistrict</label>
            <InputText id="subdistrict" 
            {...register("subdistrict", { required: "Subdistrict is required" })} 
            invalid={!!errors.subdistrict}
            aria-describedby="subdistrict-help" />
            {errors.subdistrict && (
                <small id="subdistrict-help" className="error-message" >
                    {errors.subdistrict.message}
                </small>
            )}

            <label htmlFor="province">Province</label>
            <InputText id="province" 
            {...register("province", { required: "Province is required" })} 
            invalid={!!errors.province}
            aria-describedby="province-help" />
            {errors.province && (
                <small id="province-help" className="error-message" >
                    {errors.province.message}
                </small>
            )}

            <label htmlFor="zipcode">Zipcode</label>
            <InputText id="zipcode" 
            {...register("zipcode", { required: "Zipcode is required" })} 
            invalid={!!errors.zipcode}
            aria-describedby="zipcode-help" />
            {errors.zipcode && (
                <small id="zipcode-help" className="error-message" >
                    {errors.zipcode.message}
                </small>
            )}
        </div>
    );
}