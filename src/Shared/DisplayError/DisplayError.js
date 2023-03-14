import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const DisplayError = () => {
    const { logout } = useContext(AuthContext)
    const error = useRouteError();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logout()
            .then(() => {
                navigate('/login')

            })
            .cathch(err => console.log(err))
    }
    return (
        <div>
            <p className='text-red-500'>something wrong</p>
            <p className='text-red-500'>{error.statusText || error.message}</p>
            <h4 className="text-4xl">please<button onClick={handleLogOut}>Sign Out</button> and log back</h4>
        </div>
    );
};

export default DisplayError;