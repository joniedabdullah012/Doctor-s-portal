import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState();

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';





    if (token) {
        navigate(from, { replace: true })


    }
    const handleLogin = data => {
        setLoginError('')
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email)


            })
            .catch(err => {

                console.log(err.message)
                setLoginError(err.message)

            })
    }


    return (
        <div className='h-[800px]  flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className="text-xl text-center">Log In</h2>

                <form onSubmit={handleSubmit(handleLogin)}>



                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>

                        </label>
                        <input className="input input-bordered w-full max-w-xs" type="email" {...register("email", { required: "Email Address is required" })} />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}


                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>

                        </label>
                        <input className="input input-bordered w-full max-w-xs" type="password"
                            {...register("password", { required: 'password is required', minLength: { value: 6, message: 'password must 6 character' }, })} />
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}

                        <label className="label">
                            <span className="label-text">Forget Password?</span>

                        </label>


                    </div>



                    <input className='btn btn-accent w-full' value='Login' type="submit" />
                </form>

                <p>New to doctors portal <Link className='text-secondary' to='/signup'>Create New Account</Link> </p>

                <div className="divider">OR</div>

                <div>
                    {loginError && <p className='text-red-600'>{loginError}</p>}

                </div>

                <button className='btn btn-outline w-full'>Continue With Google</button>

            </div>

        </div>
    );
};

export default Login;