import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useToken from '../Hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createUserEmail, setCreateUserEmail] = useState('');
    const [token] = useToken(createUserEmail)
    const navigate = useNavigate();

    if (token) {
        navigate('/')
    }





    const handleSignUp = data => {


        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('user successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => { })
                    .catch(err => console.error(err))
                saveUser(data.name, data.email)
            })
            .catch(err => {

                setSignUpError(err.message)
                console.error(err)
            })



    }

    const saveUser = (name, email) => {

        const user = { name, email }
        fetch('https://doctors-portal-server-silk-xi.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)

        })

            .then(res => res.json())
            .then(data => {
                setCreateUserEmail(email);

            })


    }









    return (
        <div className='h-[800px]  flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className="text-xl text-center">Sign Up</h2>

                <form onSubmit={handleSubmit(handleSignUp)}>



                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>

                        </label>
                        <input className="input input-bordered w-full max-w-xs" type="name"
                            {...register("name", { required: 'Name is required' })}


                        />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}



                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>

                        </label>
                        <input className="input input-bordered w-full max-w-xs" type="email"
                            {...register("email", { required: 'Email is required' })}


                        />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}




                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>

                        </label>
                        <input className="input input-bordered w-full max-w-xs" type="password"
                            {...register("password", {
                                required: 'password is required', minLength: 6, message: 'password must 6 character',
                                // pattern: { value: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*)/, message: 'password must be strong' }

                            })}

                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}






                    </div>



                    <input className='btn btn-accent w-full mt-4' value='sign Up' type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>

                <p>Already have a account ? <Link className='text-secondary' to='/login'>Please Log In</Link> </p>

                <div className="divider">OR</div>

                <button className='btn btn-outline w-full'>Continue With Google</button>

            </div>

        </div>
    );
};

export default SignUp;