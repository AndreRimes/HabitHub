import { FormEvent, useEffect, useState } from "react"
import LinkAuth from "../linkAuth/LinkAuth";
import style from "../authMethods/authMethods.module.css"
import axios from "axios";
import { useRouter } from "next/navigation";
import {login} from "@/redux/features/user-slice"
import {useDispatch} from 'react-redux'
import { AppDispathc } from "@/redux/store";

interface SignupFormProps {
    toggleEmail: () => void;
    isLogin: boolean;
    setError: React.Dispatch<React.SetStateAction<string>>;
}


export default function SignupForm({ toggleEmail, isLogin, setError }: SignupFormProps) {
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isButtonDisable, setIsButtonDisable] = useState(true)

    const router = useRouter()
    const dispatch = useDispatch<AppDispathc>();


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (isButtonDisable) return;
        const data = {
            email,
            password,
        }

        const ax = isLogin ? "/login" : '/user'
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + ax, data)
            if(isLogin){
                localStorage.setItem('token', res.data.token);
                dispatch(login(res.data.user))
                router.push("/dashboard");
            }else{
                router.push("/login");
            }

        } catch (e:any) {
            setError(e.response.data.error);
            console.error(e)
        }
    }

    useEffect(() => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        setIsEmailValid(isEmailValid);
        setIsPasswordValid(isPasswordValid);
        setIsButtonDisable(!isEmailValid || !isPasswordValid);
    }, [password, email]);

    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    }

    return (
        <>
            <button onClick={toggleEmail}>
                <svg
                    height="30px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.icon}
                ><polygon
                        points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "
                    />
                </svg>
            </button>


            <form className="w-full h-full animate-slide" onSubmit={(e) => handleSubmit(e)}>
                <div className="w-full h-[25%] flex flex-col items-center justify-between">
                    <div className="w-2/3 flex flex-row justify-between">
                        <h3 className="text-md text-gray-400 font-bold">Email:</h3>
                        {email !== "" && !isEmailValid &&
                            <p className="text-md text-red-500">
                                Please enter a valid email address.
                            </p>
                        }
                    </div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        className={`input input-primary rounded-none mt-1 w-2/3 h-[50%] 
                        ${email !== "" && !isEmailValid ? 'input-error' : ''}`}
                    />
                </div>

                <div
                    className={`w-full h-[45%] flex flex-col items-center justify-around py-2 ${isLogin ? 'h-[7.2vw] mb-4' : ''}`}
                >
                    <div className="w-2/3 flex flex-row justify-between">
                        <h3 className="text-md text-gray-400 font-bold">Password:</h3>
                        {!isLogin && password !== "" && !isPasswordValid &&
                            <p className="text-md text-error">Insert a Valid Password</p>
                        }
                    </div>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        className={`input input-primary rounded-none mt-1 w-2/3 h-[31%] 
                        ${isLogin ? 'h-[56%]' : ''} 
                        ${!isLogin && (password !== "" && !isPasswordValid) ? "input-error" : ""}`}
                    />
                    {!isLogin &&
                        <p className="text-md text-gray-400">
                            8+ letters, with mixture of numbers, uppercase <br /> lowercase letters.
                        </p>
                    }
                </div>

                <div
                    className={`w-full flex flex-row justify-around items-center ${isLogin ? 'py-8' : ''}`}
                >
                    <LinkAuth isLogin={isLogin} />
                    <button
                        className={`btn btn-primary w-1/4
                duration-300 ease-out ${isButtonDisable ? 'btn-disabled' : ''}`}
                        disabled={isButtonDisable}
                        type="submit">{isLogin ? 'Login' : "SignUp"}</button>
                </div>
            </form>
        </>
    )

}