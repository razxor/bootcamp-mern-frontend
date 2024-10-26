import React, { useContext, useState } from 'react'
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ROUTES from '../../routes';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

export const Login = () => {
    const { user,setUser,signIn, dBSignIn, loginWithGoogle, githubSignIn } = useContext(AuthContext);
    const [serror, setSerror] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async payload => {
        try {
            const { email, password } = payload
            signIn(email, password)
                .then( async (result) => {                             
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    if (!response.ok) {
                        //throw new Error('Failed to sign up');
                        toast.error('Invalid email or password');
                    }

                    const data = await response.json();
                    data && setUser(data.user)

                    toast.success("User Login Successful", {
                        position: "top-right",
                    });
                    
                    if (data.user.isAdmin) {
                        navigate( ROUTES.ADMIN_DASHBOARD)
                    } else {
                        navigate(location?.state ? location.state : ROUTES.HOME)
                    }                    
                })
                .catch((error) => {
                    console.log(error);
                    setSerror(error.message)
                });
        } catch (err) {
            console.log(err);
        } finally {
            //setLoading(false);
        }
    }  

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then((res) => {
                navigate(ROUTES.COURSES);
            })
            .catch((error) => {
                console.log('error');
                console.error(error);
            });
    };

    const handleGitHubSignin = () => {
        githubSignIn()
            .then((result) => {
                console.log(result.user);
                toast.success("User GitHub Login Successful", {
                    position: "top-right",
                });
                navigate(location?.state ? location.state : ROUTES.COURSES);
            })
            .catch((error) => {
                if (error.code === "auth/account-exists-with-different-credential") {
                    setSerror("An account with this email already exists. Please log in with the previously used provider.");
                } else {
                    console.error("Registration error:", error);
                    setSerror(error.message);  // Set the error message for other cases
                }
            });
    };

    return (
        <>
            <div className="bg-no-repeat bg-cover bg-center relative">
                <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
                <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                        <div className="self-start hidden lg:flex flex-col  text-white">
                            <h1 className="mb-3 font-bold text-5xl">Hi! Welcome Back </h1>
                            <p className="pr-3 text-justify">This is an online selling site is a digital platform where businesses or individuals can showcase and sell products or services to a wide audience via the internet. It includes features like product listings, secure payment processing, and order management, allowing customers to browse, purchase, and receive items conveniently from anywhere.</p>
                        </div>
                    </div>
                    <div className="flex justify-center self-center px-4 sm:px-4 md:px-0 py-4">
                        <div className="p-6 sm:p-6 md:p-12 bg-white mx-auto rounded-2xl w-100  z-10">
                            <div className="mb-6">
                                <h3 className="font-semibold py-2 text-2xl text-gray-800 text-center">Login to your account</h3>
                                {
                                    serror
                                    &&
                                    (
                                        <p className="py-2 px-4 bg-red-500 text-red-100 rounded">{serror}</p>
                                    )
                                }
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* <form onSubmit={handleLogin}> */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                        <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                            type="email" placeholder="mail@gmail.com"
                                            name='email'
                                            id='email'
                                            {...register('email', { required: "Email is required" })}
                                        />
                                        {errors.email?.type && <small role="alert" className="text-red-500">{errors.email?.message}</small>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                            Password
                                        </label>
                                        <input
                                            className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                            type="password" placeholder="Enter your password"
                                            name='password'
                                            id='password'
                                            {...register('password', { required: "Password is required" })}
                                        />
                                        {errors.password?.type && <small role="alert" className="text-red-500">{errors.password?.message}</small>}
                                    </div>
                                    {/* <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="text-green-400 hover:text-green-500">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div> */}
                                    <div>
                                        <button type="submit" className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {/* <div className='py-4'>
                                <button type="button" onClick={handleGoogleLogin} className="w-full flex justify-center bg-red-400  hover:bg-red-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                    Login with Google
                                </button>
                            </div>
                            <div className='py-0'>
                                <button type="button" onClick={handleGitHubSignin} className="w-full flex justify-center bg-gray-500  hover:bg-gray-700 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                    Login with Github
                                </button>
                            </div> */}
                            <div className="mt-2 text-center dark:text-gray-200">
                                Don't have an account? &nbsp;
                                <Link
                                    className="text-blue-500 underline hover:text-blue-600"
                                    to={`${ROUTES.REGISTER}`}
                                >
                                    Register Here
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
