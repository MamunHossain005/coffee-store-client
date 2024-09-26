import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
    const [show, setShow] = useState(false);
    const { user, setSuccessText, setErrorText, loginUser, resetPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [resetEmail, setResetEmail] = useState('');

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmitForm = data => {
        const { email, password } = data;

        setSuccessText('');
        setErrorText('');

        console.log(user);

        loginUser(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    setSuccessText('User logged in successfully');
                    navigate(location?.state ? location.state : '/');
                }
                else {
                    setErrorText('Please verify your email to login account.');
                }
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

    const handleForget = () => {
        const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

        setErrorText('');
        setSuccessText('');

        if(resetEmail){
            if(regexEmail.test(resetEmail)){
                resetPassword(resetEmail)
                .then(() => {
                    setSuccessText('Password reset email sent');
                })
                .catch(error => {
                    setErrorText(error.message);
                })
            }
            else {
                setErrorText('Invalid email address');
            }
        }
        else {
            setErrorText('Please enter a valid email address');
        }
    }

    return (
        <div className="container mx-auto bg-lime-50 py-12 px-8 h-screen">
            <div className="w-48">
                <Link to={'/'}>
                    <div className="flex items-center gap-1 btn btn-ghost shadow-lg mb-12"><FaArrowLeftLong />Back to home</div>
                </Link>
            </div>

            <form noValidate className="max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmitForm)}>
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
                        },
                        onBlur: e => {
                            const email = e.target.value;
                            setResetEmail(email);
                        }
                    })} />
                    <p className="text-red-600 mx-1 mt-1">{errors.email?.message}</p>
                </div>
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
                    <button onClick={() => setShow(!show)} className="text-xl absolute bottom-[15%] right-[3%]">
                        {show ? <IoEyeOff /> : <IoEye />}
                    </button>
                    <p className="text-red-600 mx-1 mt-1">{errors.password?.message}</p>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn w-full bg-sky-500 text-white text-lg hover:bg-white hover:text-sky-700 hover:font-bold hover:outline hover:outline-1 hover:outline-sky-500" on>Login</button>
                </div>
            </form>
            <p className="mt-4 text-center">Don't have an account? Please <Link to={'/register'}><span className="font-bold text-sky-700 hover:underline">Register</span></Link>.</p>
            <button className="ms-1 text-sm hover:underline relative bottom-[27%] left-[22.5%]" onClick={handleForget}>Forget your password?</button>
        </div>
    );
};

export default Login;