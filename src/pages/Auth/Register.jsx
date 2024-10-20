import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import ROUTES from "../../routes";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";


const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [serror, setSerror] = useState("")

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async payload => {        
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            });
      
            console.log(response);
            if (!response.ok) {
              throw new Error('Failed to sign up');
            }
      
            const result = await response.json();
           
            console.log('User registered:', result);
          } catch (err) {
            console.log(err);
          } finally {
            //setLoading(false);
          }
    };

    const handleRegister = (event) => {
        event.preventDefault();
        // const name = event.target.name.value;
        // console.log(name);

        const form = new FormData(event.currentTarget);
        console.log(form);

        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");
        console.log(name, photo, email, password);

        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                handleUserProfile(name, photo);
                toast.success(`User Registration Successful`, { position: "top-right", });
                navigate(ROUTES.HOME);
            })
            .catch((error) => {
                if (error.code === "auth/account-exists-with-different-credential") {
                    firebaseAuth.fetchSignInMethodsForEmail(email).then((methods) => {
                        if (methods.includes("google.com")) {
                            setSerror("An account with this email already exists with Google. Please log in with Google.");
                        } else if (methods.includes("facebook.com")) {
                            setSerror("An account with this email already exists with Facebook. Please log in with Facebook.");
                        } else {
                            setSerror("An account with this email exists under a different method. Please use the same method to log in.");
                        }
                    });
                } else {
                    setSerror(error.message); // Handle other errors
                }
            });
    };

    const handleUserProfile = (name, photo) => {
        const profile = { displayName: name, photoURL: photo };

        updateUserProfile(profile)
            .then(() => { })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div className="bg-no-repeat bg-cover bg-center relative"><div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
                <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                    <div className="self-start hidden lg:flex flex-col  text-white">                            
                            <h1 className="mb-3 font-bold text-5xl">Hi! Welcome Back </h1>
                            <p className="pr-3 text-justify">This is an online selling site is a digital platform where businesses or individuals can showcase and sell products or services to a wide audience via the internet. It includes features like product listings, secure payment processing, and order management, allowing customers to browse, purchase, and receive items conveniently from anywhere.</p>
                        </div>
                    </div>
                    <div className="flex justify-center self-center px-4 sm:px-4 md:px-0 py-4">
                        <div className="p-6 sm:p-6 md:p-12 bg-white mx-auto rounded-2xl w-100  z-10">
                            <div className="mb-6 text-center">
                                <h3 className="font-semibold text-2xl text-gray-800 py-2">Register your account</h3>
                                {
                                    serror
                                    &&
                                    (
                                        <p className="py-2 px-4 bg-red-500 text-red-100 rounded">{serror}</p>
                                    )
                                }
                            </div>
                            {/* <form action="" onSubmit={handleRegister}> */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-5">

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 tracking-wide">Name</label>
                                        <input
                                            className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"                                            
                                            type="text"                                            
                                            placeholder="Your Name"
                                            autoComplete="on"   
                                            {...register('fullname', {required:true})}    
                                            aria-invalid={errors.fullname ? "true" : "false"}                                      
                                        />
                                         {errors.fullname?.type === 'required' && <small role="alert" className="text-red-500">Your name is required</small>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 tracking-wide">Photo URL</label>
                                        <input
                                            className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                            id="photo"
                                            type="text"
                                            name="photo"
                                            placeholder="Photo URL"
                                            autoComplete="on"
                                            // {...register('photo', {required:true})}
                                            // aria-invalid={errors.photo ? "true" : "false"}                                      
                                        />                                         

                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                        <input
                                            className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="email@example.com"
                                            autoComplete="on"
                                            {...register('email', { required: "Email address is required" })}
                                            aria-invalid={errors.email ? "true" : "false"} 
                                        />
                                         {errors.email?.type === 'required' && <small role="alert" className="text-red-500">{errors.email?.message}</small>}

                                    </div>

                                    <div className="space-y-2">
                                        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                            Password
                                        </label>
                                        <input
                                            className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            autoComplete="on"
                                            {...register('password', {required:true})}
                                            aria-invalid={errors.password ? "true" : "false"}                                      
                                        />
                                         {errors.password?.type === 'required' && <small role="alert" className="text-red-500">Password is required</small>}
                                        
                                    </div>

                                    <div className="flex items-center align-middle">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-info"
                                        />
                                        <Link className="label-text text-blue-700 ml-2">
                                            Accept Terms and Conditions
                                        </Link>
                                    </div>

                                    <div>
                                        <button type="submit" className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                            Register
                                        </button>
                                    </div>
                                    <div className="mt-2 text-center dark:text-gray-200">
                                        Already have an account? &nbsp;
                                        <Link
                                            className="text-blue-500 underline hover:text-blue-600"
                                            to={`${ROUTES.LOGIN}`}
                                        >
                                            Login Here
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
