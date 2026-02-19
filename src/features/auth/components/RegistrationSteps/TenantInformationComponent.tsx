import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterForm } from "../../interfaces/interfaces";

export default function TenantInformationComponent(){
    const businessTypes = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<RegisterForm>();
    
    return(
        <div className="flex flex-col gap-4 justify-center">
            <label htmlFor="company-name">Company Name</label>
            <InputText id="company-name" 
            {...register("companyName", { required: "Company Name is required" })} 
            invalid={!!errors.companyName} 
            aria-describedby="company-name-help" />
            {errors.companyName && (
                <small id="company-name-help" style={{color:'red'}} >
                    {errors.companyName.message}
                </small>
            )}

            <label htmlFor="business-type">Business Type</label>
            <Controller
            name="businessTypeId"
            control={control}
            rules={{ required: "Business Type is required" }}
            render={({ field }) => (
                <Dropdown
                id="business-type"
                value={field.value}
                options={businessTypes}
                optionLabel="name"
                placeholder="Select a Business Type"
                onChange={(e) => field.onChange(e.value)}
                onBlur={field.onBlur}
                invalid={!!errors.businessTypeId}
                />
            )}
            />
            {errors.businessTypeId && (
                <small id="business-type-help" style={{color:'red'}}>
                    {errors.businessTypeId.message}
                </small>
            )}
        </div>
    );
}