import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useState } from "react";

export default function CreateAdminComponent(){
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    
    return (
        <div className="flex flex-col gap-4 w-full">
            <label htmlFor="display-name">Display Name</label>
            <InputText id="display-name" aria-describedby="display-name-help" />
            {/* <small id="email-help">
                Enter your username to reset your password.
            </small> */}


            <label htmlFor="email">Email</label>
            <InputText id="email" aria-describedby="email-help" />
            {/* <small id="email-help">
                Enter your username to reset your password.
            </small> */}

            <label htmlFor="password">Password</label>
            <Password value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} feedback={false} toggleMask inputStyle={{ width: '100%' }}/>
            {/* <small id="password-help">
                Enter your username to reset your password.
            </small> */}

            <label htmlFor="confirm-password">Confirm Password</label>
            <Password value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} feedback={false} toggleMask inputStyle={{ width: '100%' }}/>
            {/* <small id="company-name-help">
                Enter your username to reset your password.
            </small> */}
        </div>
    );
}