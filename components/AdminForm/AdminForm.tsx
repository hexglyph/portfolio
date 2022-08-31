//AdminForm 

import React, { useState } from 'react';
import { Admin } from '../../types/admin';
import { updateAdmin } from '../../services/admin';

type Props = {
    admin: Admin;
}
/*interface AdminFormProps {
    // any props that come into the component
    admin: any
}*/

/*const Button = ({ children }: ButtonProps) => (
    <button>{children}</button>
)*/

export const AdminForm = ({ admin }: Props) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (data: Admin) => {
        await updateAdmin(data);
        setShowSuccess(true);
    };

    return (
        <div>
            <h1>Admin</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={admin.name}/>
                </div>

                

                <button type="submit">Update</button>
            </form>
            
            {showSuccess && <p>Success!</p>}
        </div>
    );
}

