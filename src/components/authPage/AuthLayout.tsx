'use client'
import {useState } from "react"
import AuthMethods from "@/components/authMethods/AuthMethods"
import AuthForm from "@/components/authForm/AuthForm"
import styles from "./layout.module.css"
import LinkAuth from "../linkAuth/LinkAuth"

interface prop {
    isLogin: boolean
}

export default function AuthLayout({ isLogin}: prop) {
    const [error, setError] = useState("");
    const [isEmail, setIsEmail] = useState(true);

    const toggleEmail = () => {
        setIsEmail(!isEmail);
    }

    return (
        <div className={`${styles.card} flex flex-col items-center justify-around`}>
            <h1 className="w-2/3 text-2xl font-bold">{isLogin ? "Login" : "Create Account"}</h1>
            {error !== "" &&
                <div
                    className="w-2/3 flex items-center justify-center bg-error 
                    rounded-md py-1">
                    <h2>{error}</h2>
                </div>
            }

            <div className={`w-2/3 ${!isEmail ? 'h-[80%]' : 'h-[44%]'}`}>
                {isEmail ?
                    <AuthMethods onButtonClick={toggleEmail} />
                    :
                    <AuthForm setError={setError} isLogin={isLogin} toggleEmail={toggleEmail} />
                }
            </div>

            {isEmail &&
                <LinkAuth isLogin={isLogin} /> 
            }
        </div>
    )
}