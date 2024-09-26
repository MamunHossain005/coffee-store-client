import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { AuthContext } from "../../provider/AuthProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
    const [show, setShow] = useState(false);
    const {setSuccessText, setErrorText, registerUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            photo: "",
        }
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmitForm = data => {
        const {name, email, password, photo} = data;

        setSuccessText('');
        setErrorText('');

        registerUser(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            updateProfile(user, {
                displayName: name,
                photoURL: photo,
            })
            .then(() => {
                sendEmailVerification(user)
                .then(() => {
                    setSuccessText('User registered successfully. Check your email to verify account.');
                    navigate('/login');
                })
            })
            .catch(error => {
                setErrorText(error.message);
            })
        })
        .catch(error => {
            setErrorText(error.message);
        })
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className="container mx-auto bg-lime-50 py-12 px-8">
            <div className="w-48">
                <Link to={'/login'}>
                    <div className="flex items-center gap-1 btn btn-ghost shadow-lg mb-12"><FaArrowLeftLong />Back to Login</div>
                </Link>
            </div>
            <h1 className="text-center font-bold text-5xl mb-8">Register</h1>
            <form noValidate className="max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmitForm)}>
                {/* name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block font-bold text-lg mb-2 ms-1">Name</label>
                    <input type="text" id="name" className="w-full bg-sky-100 ps-4 py-2 rounded-lg font-medium text-gray-600 outline-none focus:border-2 focus:border-sky-300" placeholder="Name" {...register("name", {
                        required: {
                            value: true,
                            message: "Name is required",
                        },
                        minLength: {
                            value: 3,
                            message: "Name should be in 3 characters or longer"
                        }
                    })} />
                    <p className="text-red-600 mx-1 mt-1">{errors.name?.message}</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="photo" className="block font-bold text-lg mb-2 ms-1">Photo URL</label>
                    <input type="text" id="photo" className="w-full bg-sky-100 ps-4 py-2 rounded-lg font-medium text-gray-600 outline-none focus:border-2 focus:border-sky-300" placeholder="Photo URL" {...register("photo", {
                        pattern: {
                            value: /https?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+\.(?:jpg|jpeg|png|gif|bmp|webp)/g,
                            message: "Invalid photo URL",
                        }
                    })} />
                    <p className="text-red-600 mx-1 mt-1">{errors.photo?.message}</p>
                </div>
                {/* email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold text-lg mb-2 ms-1">Email</label>
                    <input type="email" id="email" className="w-full bg-sky-100 ps-4 py-2 rounded-lg font-medium text-gray-600 outline-none focus:border-2 focus:border-sky-300" placeholder="Email address" {...register("email", {
                        required: {
                            value: true,
                            message: "Email is required",
                        },
                        pattern: {
                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                            message: "Invalid email address",
                        }
                    })} />
                    <p className="text-red-600 mx-1 mt-1">{errors.email?.message}</p>
                </div>
                {/* password */}
                <div className="mb-16 relative">
                    <label htmlFor="password" className="block font-bold text-lg mb-2 ms-1">Password</label>
                    <input type={`${show ? 'text' : 'password'}`} id="password" className="w-full bg-sky-100 ps-4 py-2 rounded-lg font-medium text-gray-600 outline-none focus:border-2 focus:border-sky-300" placeholder="Password" {...register("password", {
                        required: {
                            value: true,
                            message: "Password is required",
                        },
                        minLength: {
                            value: 6,
                            message: "Password should be at least 6 characters or longer",
                        },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: "Invalid password",
                        }
                    })} />
                    <div onClick={() => setShow(!show)} className="text-xl absolute bottom-[15%] right-[3%]">
                        {show ? <IoEyeOff /> : <IoEye />}
                    </div>
                    <p className="text-red-600 mx-1 mt-1">{errors.password?.message}</p>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn w-full bg-sky-500 text-white text-lg hover:bg-white hover:text-sky-700 hover:font-bold hover:outline hover:outline-1 hover:outline-sky-500">Register</button>
                </div>
            </form>
            <p className="mt-4 text-center">Already have an account? Please <Link to={'/login'}><span className="font-bold text-sky-700 hover:underline">Login</span></Link>.</p>           
        </div>
    );
};

export default Register;